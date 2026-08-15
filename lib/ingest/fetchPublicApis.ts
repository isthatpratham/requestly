/**
 * lib/ingest/fetchPublicApis.ts
 *
 * Fetches the public-apis catalog from the official GitHub repository README.
 * Parses the markdown table format into a structured array.
 *
 * Source: https://raw.githubusercontent.com/public-apis/public-apis/master/README.md
 *
 * README table format (per category):
 *   ### Category Name
 *   API | Description | Auth | HTTPS | CORS
 *   |:---|:---|:---|:---|:---|
 *   | [Name](url) | description | apiKey | Yes | yes |
 *
 * ⚠️  Server-side only.
 */

const SOURCE_URL =
  "https://raw.githubusercontent.com/public-apis/public-apis/master/README.md";

const SOURCE_PROVIDER = "public-apis";
const SOURCE_REPO_URL = "https://github.com/public-apis/public-apis";

const FETCH_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2_000;

export interface RawApiEntry {
  name: string;
  url: string;
  description: string;
  auth: string;
  https: string;
  cors: string;
  category: string;
  sourceProvider: string;
  sourceUrl: string;
}

/** Fetches the README with timeout and bounded retries. */
async function fetchWithRetry(url: string): Promise<string> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);

      if (!response.ok) {
        // Do not retry client errors (4xx) — they are permanent.
        if (response.status >= 400 && response.status < 500) {
          throw new Error(
            `[Ingest] Fetch failed with permanent error: HTTP ${response.status}`
          );
        }
        // Retry server errors (5xx) and unexpected statuses.
        throw new Error(`[Ingest] Fetch failed: HTTP ${response.status}`);
      }

      return await response.text();
    } catch (err) {
      clearTimeout(timer);
      lastError = err instanceof Error ? err : new Error(String(err));

      const isAbort =
        lastError.name === "AbortError" ||
        lastError.message.includes("abort");
      const isPermanent = lastError.message.includes("permanent error");

      if (isPermanent) throw lastError;

      if (attempt < MAX_RETRIES) {
        const reason = isAbort ? "timeout" : "transient error";
        console.warn(
          `[Ingest] Attempt ${attempt}/${MAX_RETRIES} failed (${reason}). Retrying in ${RETRY_DELAY_MS}ms…`
        );
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }

  throw lastError ?? new Error("[Ingest] Fetch failed after retries.");
}

/**
 * Parses a markdown link like [Name](https://example.com) into { text, url }.
 * Returns null if not a valid link.
 */
function parseMarkdownLink(
  cell: string
): { text: string; url: string } | null {
  const match = cell.trim().match(/^\[(.+?)\]\((https?:\/\/[^)]+)\)$/);
  if (!match) return null;
  return { text: match[1].trim(), url: match[2].trim() };
}

/**
 * Parses the public-apis README markdown into an array of raw API entries.
 * Handles category headings (### Category) and table rows.
 */
function parseReadme(markdown: string): RawApiEntry[] {
  const entries: RawApiEntry[] = [];
  const lines = markdown.split("\n");

  let currentCategory = "";
  let inTable = false;
  let headerParsed = false;

  // Categories to ignore (meta sections, non-API lists)
  const ignoredCategories = new Set([
    "APILayer APIs",
    "APIs Covered Under APILayer Suite!",
    "Index",
    "Learn more about Public APIs",
    "Try Public APIs for free",
  ]);

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect category headers (### Category or ## Category)
    if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
      const cat = trimmed.replace(/^#+\s*/, "").trim();
      if (!ignoredCategories.has(cat)) {
        currentCategory = cat;
        inTable = false;
        headerParsed = false;
      } else {
        inTable = false;
        headerParsed = false;
      }
      continue;
    }

    // Detect table header row ("API | Description | Auth | HTTPS | CORS" or "| API | ...")
    const lowerLine = trimmed.toLowerCase();
    if (
      (lowerLine.includes("api |") || lowerLine.includes("api|")) &&
      lowerLine.includes("description")
    ) {
      inTable = true;
      headerParsed = false;
      continue;
    }

    // Skip separator row (|:---|:---|... or :---|...)
    if (inTable && trimmed.includes("---")) {
      headerParsed = true;
      continue;
    }

    // Parse data rows starting with |
    if (inTable && headerParsed && trimmed.startsWith("|")) {
      // Split on | and trim each cell
      const rawCells = trimmed.split("|").map((c) => c.trim());

      // Filter out empty leading/trailing elements from pipe split
      const cells = rawCells.filter((c, i) => {
        if (i === 0 && c === "") return false;
        if (i === rawCells.length - 1 && c === "") return false;
        return true;
      });

      // Need at least 5 cells (API, Description, Auth, HTTPS, CORS)
      if (cells.length < 5) continue;

      const apiCell = cells[0];
      const description = cells[1];
      const auth = cells[2];
      const https = cells[3];
      const cors = cells[4];

      const link = parseMarkdownLink(apiCell);
      if (!link) continue; // skip rows without a valid link

      if (!currentCategory) continue;

      entries.push({
        name: link.text,
        url: link.url,
        description: description,
        auth: auth,
        https: https,
        cors: cors,
        category: currentCategory,
        sourceProvider: SOURCE_PROVIDER,
        sourceUrl: SOURCE_REPO_URL,
      });
      continue;
    }

    // Reset table state if we hit a link to top of index
    if (trimmed.includes("Back to Index") || trimmed.startsWith("#")) {
      inTable = false;
      headerParsed = false;
    }
  }

  return entries;
}

/**
 * Fetches and parses the public-apis catalog.
 * Returns an array of raw entries for further normalization and validation.
 */
export async function fetchPublicApis(): Promise<{
  entries: RawApiEntry[];
  fetchedAt: Date;
}> {
  console.log("[Ingest] Fetching public-apis catalog from GitHub…");

  const markdown = await fetchWithRetry(SOURCE_URL);

  if (!markdown || markdown.length < 1000) {
    throw new Error(
      "[Ingest] Source response is too short to be valid. Aborting."
    );
  }

  const entries = parseReadme(markdown);

  if (entries.length === 0) {
    throw new Error(
      "[Ingest] Parsed 0 entries from source. Response format may have changed. Aborting."
    );
  }

  console.log(
    `[Ingest] Fetched and parsed ${entries.length} raw entries from source.`
  );

  return { entries, fetchedAt: new Date() };
}
