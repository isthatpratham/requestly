"use client";

import * as React from "react";
import Link from "next/link";
import { HistoryEntry } from "@/types/api";
import {
  getStoredHistory,
  clearStoredHistory,
  deleteHistoryEntry,
} from "@/lib/storage/historyStorage";

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
      <div className="min-h-screen" style={{ paddingTop: "72px" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 font-mono text-xs text-text-muted">
          Loading stored request history…
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
              Activity Log // {history.length} Entries
            </span>
            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="font-mono text-[10px] text-text-muted hover:text-semantic-error transition-colors"
              >
                Clear History
              </button>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-brand-black tracking-tight mb-2">
            Request History
          </h1>
          <p className="text-sm text-text-secondary max-w-lg leading-relaxed">
            Local execution log of past HTTP requests. Sensitive keys and tokens
            are automatically scrubbed before saving.
          </p>
        </div>
      </div>

      {/* Main Content — Dense Log Table */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
        {history.length === 0 ? (
          <div className="border border-border-default rounded-xs px-6 py-16 text-center">
            <p className="font-display text-xl text-text-muted mb-2">No history recorded.</p>
            <p className="text-xs text-text-muted mb-6">
              Execute HTTP requests in the Playground to see your activity log here.
            </p>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xs bg-brand-black text-brand-white text-xs font-mono"
            >
              Open Playground →
            </Link>
          </div>
        ) : (
          <div className="border border-border-default rounded-xs overflow-hidden divide-y divide-border-subtle bg-background-elevated">
            {/* Table Header */}
            <div className="grid grid-cols-[60px_1fr_100px_80px_140px_auto] gap-3 px-4 py-2 bg-background-secondary border-b border-border-default font-mono text-[10px] text-text-muted uppercase tracking-wider select-none">
              <span>Method</span>
              <span>URL</span>
              <span>Status</span>
              <span>Latency</span>
              <span>Time</span>
              <span className="text-right">Action</span>
            </div>

            {/* Log Rows */}
            {history.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[60px_1fr_100px_80px_140px_auto] gap-3 px-4 py-3 items-center text-xs font-mono hover:bg-background-secondary transition-colors duration-[80ms]"
              >
                {/* Method */}
                <span className="font-bold text-accent-blue uppercase">
                  {item.method}
                </span>

                {/* URL */}
                <span className="text-text-primary truncate" title={item.url}>
                  {item.url}
                </span>

                {/* Status */}
                <span className={item.isSuccess ? "text-semantic-success font-semibold" : "text-semantic-error font-semibold"}>
                  {item.status ? `${item.status}` : "ERR"}
                </span>

                {/* Latency */}
                <span className="text-text-muted">
                  {item.responseTime > 0 ? `${item.responseTime}ms` : "—"}
                </span>

                {/* Time */}
                <span className="text-text-muted text-[10px]">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/playground?url=${encodeURIComponent(item.url)}&method=${item.method}`}
                    className="text-[10px] text-text-muted hover:text-brand-black underline underline-offset-2"
                  >
                    Reopen
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-[10px] text-text-disabled hover:text-semantic-error"
                    title="Delete entry"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
