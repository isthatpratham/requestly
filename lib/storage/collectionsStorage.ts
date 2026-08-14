import { Collection } from "@/types/api";

const STORAGE_KEY = "requestly_collections_v1";

const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: "col_default_1",
    name: "Weather & Science APIs",
    createdAt: "2026-08-14T20:00:00.000Z",
    updatedAt: "2026-08-14T20:00:00.000Z",
    apiIds: ["open-meteo", "nasa-api"],
  },
  {
    id: "col_default_2",
    name: "Developer Utilities",
    createdAt: "2026-08-14T21:00:00.000Z",
    updatedAt: "2026-08-14T21:00:00.000Z",
    apiIds: ["github-users", "jsonplaceholder", "httbin-org"],
  },
];

export function getStoredCollections(): Collection[] {
  if (typeof window === "undefined") return DEFAULT_COLLECTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COLLECTIONS));
      return DEFAULT_COLLECTIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return DEFAULT_COLLECTIONS;
  } catch {
    return DEFAULT_COLLECTIONS;
  }
}

export function saveStoredCollections(collections: Collection[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
  } catch (err) {
    console.error("Failed to persist collections to localStorage:", err);
  }
}

export function createCollection(name: string): Collection {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Collection name cannot be empty.");

  const collections = getStoredCollections();
  const newCol: Collection = {
    id: `col_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: trimmed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    apiIds: [],
  };

  const updated = [newCol, ...collections];
  saveStoredCollections(updated);
  return newCol;
}

export function renameCollection(id: string, newName: string): void {
  const trimmed = newName.trim();
  if (!trimmed) return;

  const collections = getStoredCollections();
  const updated = collections.map((c) =>
    c.id === id ? { ...c, name: trimmed, updatedAt: new Date().toISOString() } : c
  );
  saveStoredCollections(updated);
}

export function deleteCollection(id: string): void {
  const collections = getStoredCollections();
  const updated = collections.filter((c) => c.id !== id);
  saveStoredCollections(updated);
}

export function toggleApiInCollection(collectionId: string, apiId: string): boolean {
  const collections = getStoredCollections();
  let isSaved = false;

  const updated = collections.map((c) => {
    if (c.id === collectionId) {
      const exists = c.apiIds.includes(apiId);
      isSaved = !exists;
      const apiIds = exists
        ? c.apiIds.filter((id) => id !== apiId)
        : [...c.apiIds, apiId];
      return { ...c, apiIds, updatedAt: new Date().toISOString() };
    }
    return c;
  });

  saveStoredCollections(updated);
  return isSaved;
}

export function isApiSavedInAnyCollection(apiId: string): boolean {
  const collections = getStoredCollections();
  return collections.some((c) => c.apiIds.includes(apiId));
}
