"use client";

import * as React from "react";
import Link from "next/link";
import { HistoryEntry } from "@/types/api";
import {
  getStoredHistory,
  clearStoredHistory,
  deleteHistoryEntry,
} from "@/lib/storage/historyStorage";
import { MOCK_CATALOG_APIS } from "@/data/mockCatalog";
import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export const HistoryShell: React.FC = () => {
  const [history, setHistory] = React.useState<HistoryEntry[]>([]);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setHistory(getStoredHistory());
    setIsHydrated(true);
  }, []);

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear your entire request history?")) {
      clearStoredHistory();
      setHistory([]);
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getStoredHistory());
  };

  if (!isHydrated) {
    return (
      <Container className="py-12 space-y-6">
        <PageHeading title="Request History" description="Recent API executions log." />
        <div className="p-8 text-center text-xs font-mono text-text-muted">
          Loading stored request history...
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <PageHeading
          title="Request History"
          description="Inspect past API requests sent from the Playground. Persisted locally in your browser workspace with sensitive credential redaction."
          badge={
            <Badge variant="outline" size="sm" className="font-mono">
              LOG // {history.length} ENTRIES
            </Badge>
          }
        />

        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="font-mono text-xs text-semantic-error-fg hover:text-red-700 shrink-0 self-start sm:self-auto"
          >
            Clear History
          </Button>
        )}
      </div>

      {/* History List or Empty State */}
      {history.length === 0 ? (
        <EmptyState
          title="No request history recorded yet"
          description="Execute HTTP requests in the API Playground to inspect past requests, response status codes, and latency logs here."
          action={
            <Link href="/playground">
              <Button variant="primary" size="sm">
                Open API Playground →
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {history.map((item) => {
            const matchedCatalogApi = MOCK_CATALOG_APIS.find((a) =>
              item.url.toLowerCase().includes(a.id) || a.url.toLowerCase().includes(item.url.toLowerCase())
            );

            return (
              <div
                key={item.id}
                className="p-4 rounded-sm border border-border-default bg-background-elevated space-y-3 hover:border-border-strong transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-xs bg-neutral-900 text-neutral-100">
                      {item.method}
                    </span>

                    <Badge
                      variant={item.isSuccess ? "operational" : "warning"}
                      size="sm"
                      className="font-mono"
                    >
                      {item.status ? `${item.status} ${item.statusText}` : item.statusText}
                    </Badge>

                    {item.responseTime > 0 && (
                      <span className="text-xs font-mono text-text-muted">
                        {item.responseTime} ms
                      </span>
                    )}

                    <Badge variant="outline" size="sm" className="font-mono">
                      Auth: {item.authType}
                    </Badge>
                  </div>

                  <span className="text-[11px] font-mono text-text-muted">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>

                {/* URL Display */}
                <div className="p-2 rounded-xs bg-background-secondary border border-border-subtle font-mono text-xs text-text-primary select-all truncate">
                  {item.url}
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-3">
                    <Link href={`/playground?url=${encodeURIComponent(item.url)}&method=${item.method}`}>
                      <Button variant="outline" size="sm" className="text-xs font-mono">
                        Reopen in Playground →
                      </Button>
                    </Link>

                    {matchedCatalogApi && (
                      <Link href={`/explore/${matchedCatalogApi.id}`}>
                        <Button variant="ghost" size="sm" className="text-xs text-text-secondary hover:text-brand-black">
                          Inspect Catalog API
                        </Button>
                      </Link>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-xs font-mono text-text-muted hover:text-semantic-error-fg"
                  >
                    Delete Entry
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
};
