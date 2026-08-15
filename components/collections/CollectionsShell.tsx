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
import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { ApiCard } from "@/components/api/ApiCard";

export const CollectionsShell: React.FC = () => {
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [catalogApis, setCatalogApis] = React.useState<ApiItem[]>(MOCK_CATALOG_APIS);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [newCollectionName, setNewCollectionName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingName, setEditingName] = React.useState("");

  // Load collections and catalog APIs cleanly on client mount
  React.useEffect(() => {
    setCollections(getStoredCollections());
    setIsHydrated(true);

    fetch("/api/apis?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.apis) && data.data.apis.length > 0) {
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
      <Container className="py-12 space-y-6">
        <PageHeading
          title="My Saved Collections"
          description="Organize, group, and launch your saved public APIs."
        />
        <div className="p-8 text-center text-xs font-mono text-text-muted">
          Loading stored collections...
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <PageHeading
          title="My Saved Collections"
          description="Group, manage, and quickly access saved public APIs. Persisted locally in your browser workspace."
          badge={
            <Badge variant="outline" size="sm" className="font-mono">
              COLLECTIONS // {collections.length}
            </Badge>
          }
        />

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsCreating(true)}
          className="font-mono text-xs shrink-0 self-start sm:self-auto"
        >
          + Create Collection
        </Button>
      </div>

      {/* Create Collection Form Modal/Inline */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-4 max-w-lg"
        >
          <h3 className="text-sm font-semibold text-brand-black font-mono">
            Create New Collection
          </h3>
          <div className="space-y-1">
            <label className="block text-xs font-mono text-text-muted">Collection Name</label>
            <Input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="e.g. Weather Services, Dev Tools"
              autoFocus
              className="h-9 text-xs font-sans"
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Button type="submit" variant="primary" size="sm">
              Save Collection
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsCreating(false);
                setNewCollectionName("");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Collections List or Empty State */}
      {collections.length === 0 ? (
        <EmptyState
          title="No collections created yet"
          description="Create collections to group related APIs for fast testing in the Playground or inspection."
          action={
            <Link href="/explore">
              <Button variant="outline" size="sm">
                Explore Public Catalog →
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-8">
          {collections.map((col) => {
            const savedApis = col.apiIds
              .map((id) => catalogApis.find((a) => a.id === id || a.url === id || a.name === id))
              .filter((a): a is ApiItem => a !== undefined);

            return (
              <div
                key={col.id}
                className="p-6 rounded-sm border border-border-default bg-background-elevated space-y-6"
              >
                {/* Collection Title Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
                  <div>
                    {editingId === col.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="h-8 text-sm font-sans"
                        />
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleRename(col.id)}
                          className="h-8 px-2 text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingId(null)}
                          className="h-8 px-2 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <h2 className="text-lg font-semibold text-brand-black tracking-tight">
                        {col.name}
                      </h2>
                    )}
                    <p className="text-xs font-mono text-text-muted mt-0.5">
                      {savedApis.length} saved APIs · Updated {new Date(col.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {editingId !== col.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(col.id);
                          setEditingName(col.name);
                        }}
                        className="text-xs font-mono text-text-secondary hover:text-brand-black"
                      >
                        Rename
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(col.id)}
                      className="text-xs font-mono text-semantic-error-fg hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Saved API Cards Grid */}
                {savedApis.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-border-subtle rounded-xs text-xs font-mono text-text-muted">
                    No APIs saved in this collection. Browse the{" "}
                    <Link href="/explore" className="underline hover:text-brand-black">
                      Catalog
                    </Link>{" "}
                    to add APIs.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedApis.map((api) => (
                      <div key={api.id} className="relative group">
                        <ApiCard api={api} />
                        <button
                          type="button"
                          onClick={() => handleRemoveApi(col.id, api.id)}
                          title="Remove from collection"
                          aria-label={`Remove ${api.name} from collection`}
                          className="absolute top-3 right-3 h-6 w-6 rounded-full bg-background-elevated border border-border-default text-text-muted hover:text-semantic-error-fg text-xs font-mono flex items-center justify-center shadow-xs"
                        >
                          ✕
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
    </Container>
  );
};
