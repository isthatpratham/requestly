import * as React from "react";
import { QueryPair } from "@/types/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface QueryEditorProps {
  query: QueryPair[];
  onChange: (query: QueryPair[]) => void;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ query, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...query,
      { id: `q_${Date.now()}_${Math.random()}`, key: "", value: "", enabled: true },
    ]);
  };

  const handleUpdate = (id: string, field: keyof QueryPair, val: unknown) => {
    onChange(
      query.map((q) => (q.id === id ? { ...q, [field]: val } : q))
    );
  };

  const handleRemove = (id: string) => {
    onChange(query.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-mono text-text-muted">
        <span>URL Query Parameters</span>
        <Button variant="ghost" size="sm" onClick={handleAdd} className="h-6 px-2 text-xs">
          + Add Parameter
        </Button>
      </div>

      {query.length === 0 ? (
        <div className="p-4 text-center border border-dashed border-border-subtle rounded-xs text-xs font-mono text-text-muted">
          No query parameters configured. Click &quot;+ Add Parameter&quot; above.
        </div>
      ) : (
        <div className="space-y-2">
          {query.map((q) => (
            <div key={q.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={q.enabled}
                onChange={(e) => handleUpdate(q.id, "enabled", e.target.checked)}
                className="h-4 w-4 rounded-xs border-border-default text-brand-black focus:ring-brand-black"
                aria-label="Enable query parameter"
              />
              <Input
                type="text"
                value={q.key}
                onChange={(e) => handleUpdate(q.id, "key", e.target.value)}
                placeholder="Parameter Key"
                className="h-8 font-mono text-xs flex-1"
                aria-label="Query parameter key"
              />
              <Input
                type="text"
                value={q.value}
                onChange={(e) => handleUpdate(q.id, "value", e.target.value)}
                placeholder="Parameter Value"
                className="h-8 font-mono text-xs flex-1"
                aria-label="Query parameter value"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(q.id)}
                className="h-8 w-8 text-text-muted hover:text-semantic-error-fg text-xs font-mono"
                aria-label="Remove parameter"
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
