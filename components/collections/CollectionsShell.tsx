"use client";

import * as React from "react";
import Link from "next/link";
import { Collection, ApiItem } from "@/types/api";
import {
  getStoredCollections,
  createCollection,
  renameCollection,
  deleteCollection,
  toggleApiInCollection,
} from "@/lib/storage/collectionsStorage";
import { MOCK_CATALOG_APIS } from "@/data/mockCatalog";
import { ApiRow } from "@/components/api/ApiRow";

export const CollectionsShell: React.FC = () => {
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [catalogApis, setCatalogApis] = React.useState<ApiItem[]>(MOCK_CATALOG_APIS);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [newCollectionName, setNewCollectionName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingName, setEditingName] = React.useState("");

  React.useEffect(() => {
    setCollections(getStoredCollections());
    setIsHydrated(true);

    fetch("/api/apis?limit=100")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.items) && data.data.items.length > 0) {
          setCatalogApis(data.data.items);
        } else if (data.success && Array.isArray(data.data?.apis) && data.data.apis.length > 0) {
          setCatalogApis(data.data.apis);
        }
      })
      .catch((err) => console.error("Failed to load catalog APIs in CollectionsShell:", err));
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    createCollection(newCollectionName.trim());
    setCollections(getStoredCollections());
    setNewCollectionName("");
    setIsCreating(false);
  };

  const handleRename = (id: string) => {
    if (!editingName.trim()) return;
    renameCollection(id, editingName.trim());
    setCollections(getStoredCollections());
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this collection?")) {
      deleteCollection(id);
      setCollections(getStoredCollections());
    }
  };

  const handleRemoveApi = (collectionId: string, apiId: string) => {
    toggleApiInCollection(collectionId, apiId);
    setCollections(getStoredCollections());
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen" style={{ paddingTop: "72px" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 font-mono text-xs text-text-muted">
          Loading stored collections…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: "72px" }}>
      {/* Header */}
      <div className="border-b border-border-default bg-background-secondary">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
              Workspace // {collections.length} Collections
            </span>
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="px-3 py-1.5 rounded-xs bg-brand-black text-brand-white text-xs font-mono font-medium hover:opacity-80 transition-opacity"
            >
              + Create Collection
            </button>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-brand-black tracking-tight mb-2">
            Collections
          </h1>
          <p className="text-sm text-text-secondary max-w-lg leading-relaxed">
            Group related APIs into custom collections for fast reference and execution.
            Saved locally in your browser.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 space-y-8">

        {/* Create collection inline form */}
        {isCreating && (
          <form
            onSubmit={handleCreate}
            className="p-4 border border-border-default rounded-xs bg-background-elevated space-y-3 max-w-md"
          >
            <span className="font-mono text-[10px] uppercase text-text-muted block">
              New Collection
            </span>
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="e.g. Financial APIs, Weather Services"
              autoFocus
              className="w-full h-8 px-3 text-xs font-mono bg-background-primary border border-border-default rounded-xs focus:outline-none focus:border-accent-blue"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-3 py-1 rounded-xs bg-brand-black text-brand-white text-xs font-mono"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => { setIsCreating(false); setNewCollectionName(""); }}
                className="px-3 py-1 text-xs font-mono text-text-muted hover:text-brand-black"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {collections.length === 0 ? (
          <div className="border border-border-default rounded-xs px-6 py-16 text-center">
            <p className="font-display text-xl text-text-muted mb-2">No collections created.</p>
            <p className="text-xs text-text-muted mb-6">
              Create a collection to organize APIs saved from the catalog.
            </p>
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xs bg-brand-black text-brand-white text-xs font-mono"
            >
              + Create First Collection
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {collections.map((col) => {
              const savedApis = col.apiIds
                .map((id) => catalogApis.find((a) => a.id === id || a.url === id || a.name === id))
                .filter((a): a is ApiItem => a !== undefined);

              return (
                <div key={col.id} className="border border-border-default rounded-xs overflow-hidden bg-background-elevated">
                  {/* Collection Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-background-secondary border-b border-border-default">
                    <div>
                      {editingId === col.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="h-7 px-2 text-xs font-mono border border-border-default rounded-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleRename(col.id)}
                            className="text-xs font-mono text-accent-blue font-semibold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <h2 className="font-display text-lg font-medium text-brand-black">
                          {col.name}
                        </h2>
                      )}
                      <span className="font-mono text-[10px] text-text-muted">
                        {savedApis.length} APIs · Updated {new Date(col.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      {editingId !== col.id && (
                        <button
                          type="button"
                          onClick={() => { setEditingId(col.id); setEditingName(col.name); }}
                          className="text-text-muted hover:text-brand-black"
                        >
                          Rename
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(col.id)}
                        className="text-text-disabled hover:text-semantic-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Saved APIs List */}
                  {savedApis.length === 0 ? (
                    <div className="px-4 py-8 text-center font-mono text-xs text-text-muted">
                      No APIs in this collection yet. Browse the{" "}
                      <Link href="/explore" className="underline hover:text-brand-black">
                        Catalog
                      </Link>{" "}
                      to save APIs here.
                    </div>
                  ) : (
                    <div className="divide-y divide-border-subtle">
                      {savedApis.map((api) => (
                        <div key={api.id} className="relative group">
                          <ApiRow api={api} />
                          <button
                            type="button"
                            onClick={() => handleRemoveApi(col.id, api.id)}
                            title="Remove from collection"
                            className="absolute right-12 top-1/2 -translate-y-1/2 hidden group-hover:block font-mono text-[10px] text-text-muted hover:text-semantic-error"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
