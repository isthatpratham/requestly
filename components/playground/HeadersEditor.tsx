import * as React from "react";
import { HeaderPair } from "@/types/api";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface HeadersEditorProps {
  headers: HeaderPair[];
  onChange: (headers: HeaderPair[]) => void;
}

export const HeadersEditor: React.FC<HeadersEditorProps> = ({ headers, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...headers,
      { id: `h_${Date.now()}_${Math.random()}`, key: "", value: "", enabled: true },
    ]);
  };

  const handleUpdate = (id: string, field: keyof HeaderPair, val: unknown) => {
    onChange(
      headers.map((h) => (h.id === id ? { ...h, [field]: val } : h))
    );
  };

  const handleRemove = (id: string) => {
    onChange(headers.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-mono text-text-muted">
        <span>Request HTTP Headers</span>
        <Button variant="ghost" size="sm" onClick={handleAdd} className="h-6 px-2 text-xs">
          + Add Header
        </Button>
      </div>

      {headers.length === 0 ? (
        <div className="p-4 text-center border border-dashed border-border-subtle rounded-xs text-xs font-mono text-text-muted">
          No custom headers configured. Click &quot;+ Add Header&quot; above.
        </div>
      ) : (
        <div className="space-y-2">
          {headers.map((h) => (
            <div key={h.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={h.enabled}
                onChange={(e) => handleUpdate(h.id, "enabled", e.target.checked)}
                className="h-4 w-4 rounded-xs border-border-default text-brand-black focus:ring-brand-black"
                aria-label="Enable header"
              />
              <Input
                type="text"
                value={h.key}
                onChange={(e) => handleUpdate(h.id, "key", e.target.value)}
                placeholder="Header (e.g. Accept)"
                className="h-8 font-mono text-xs flex-1"
                aria-label="Header key"
              />
              <Input
                type="text"
                value={h.value}
                onChange={(e) => handleUpdate(h.id, "value", e.target.value)}
                placeholder="Header Value (e.g. application/json)"
                className="h-8 font-mono text-xs flex-1"
                aria-label="Header value"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(h.id)}
                className="h-8 w-8 text-text-muted hover:text-semantic-error-fg text-xs font-mono"
                aria-label="Remove header"
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
