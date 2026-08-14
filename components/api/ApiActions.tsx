"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  getStoredCollections,
  toggleApiInCollection,
  isApiSavedInAnyCollection,
  createCollection,
} from "@/lib/storage/collectionsStorage";

export interface ApiActionsProps {
  apiId: string;
  url: string;
}

export const ApiActions: React.FC<ApiActionsProps> = ({ apiId, url }) => {
  const [isSaved, setIsSaved] = React.useState(false);
  const [savedColName, setSavedColName] = React.useState<string | null>(null);

  React.useEffect(() => {
    const saved = isApiSavedInAnyCollection(apiId);
    setIsSaved(saved);
    if (saved) {
      const cols = getStoredCollections();
      const col = cols.find((c) => c.apiIds.includes(apiId));
      if (col) setSavedColName(col.name);
    }
  }, [apiId]);

  const handleToggleSave = () => {
    let cols = getStoredCollections();
    if (cols.length === 0) {
      createCollection("My Saved APIs");
      cols = getStoredCollections();
    }

    const targetCol = cols[0];
    const newState = toggleApiInCollection(targetCol.id, apiId);
    setIsSaved(newState);
    setSavedColName(newState ? targetCol.name : null);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href={`/playground?api=${apiId}`}>
        <Button variant="primary" size="md" className="font-mono text-xs px-5">
          Open in Playground →
        </Button>
      </Link>

      <Button
        variant={isSaved ? "secondary" : "outline"}
        size="md"
        onClick={handleToggleSave}
        className="font-mono text-xs"
      >
        {isSaved
          ? `✓ Saved in ${savedColName || "Collection"}`
          : "+ Save to Collection"}
      </Button>

      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="md" className="font-mono text-xs text-text-secondary hover:text-brand-black">
          Visit Base URL ↗
        </Button>
      </a>
    </div>
  );
};
