import { HistoryEntry, ApiRequestState, ApiResponseData } from "@/types/api";

const STORAGE_KEY = "requestly_history_v1";
const MAX_HISTORY_ITEMS = 50;

const SENSITIVE_HEADER_KEYS = [
  "authorization",
  "proxy-authorization",
  "cookie",
  "set-cookie",
  "x-api-key",
  "api-key",
  "apikey",
  "token",
];

function sanitizeHeaders(headers: { key: string; value: string; enabled: boolean }[]): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((h) => {
    if (!h.enabled || !h.key.trim()) return;
    const lowerKey = h.key.toLowerCase().trim();
    if (SENSITIVE_HEADER_KEYS.includes(lowerKey)) {
      result[h.key.trim()] = "[REDACTED_SECRET]";
    } else {
      result[h.key.trim()] = h.value;
    }
  });
  return result;
}

export function getStoredHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function saveStoredHistory(history: HistoryEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS)));
  } catch (err) {
    console.error("Failed to persist request history to localStorage:", err);
  }
}

export function recordHistoryEntry(req: ApiRequestState, res?: ApiResponseData | null, errorMsg?: string): HistoryEntry {
  const queryMap: Record<string, string> = {};
  req.query.forEach((q) => {
    if (q.enabled && q.key.trim()) {
      queryMap[q.key.trim()] = q.value;
    }
  });

  const safeHeaders = sanitizeHeaders(req.headers);

  const entry: HistoryEntry = {
    id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    method: req.method,
    url: req.url,
    queryParams: queryMap,
    headers: safeHeaders,
    authType: req.auth.type,
    status: res ? res.status : 0,
    statusText: res ? res.statusText : errorMsg || "Request Failed",
    responseTime: res ? res.responseTime : 0,
    contentType: res ? res.contentType : "application/json",
    timestamp: new Date().toISOString(),
    isSuccess: !!res && res.status >= 200 && res.status < 400,
  };

  const existing = getStoredHistory();
  const updated = [entry, ...existing];
  saveStoredHistory(updated);
  return entry;
}

export function clearStoredHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear history from localStorage:", err);
  }
}

export function deleteHistoryEntry(id: string): void {
  const existing = getStoredHistory();
  const updated = existing.filter((h) => h.id !== id);
  saveStoredHistory(updated);
}
