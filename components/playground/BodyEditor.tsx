import * as React from "react";
import { Textarea } from "@/components/ui/Textarea";

export interface BodyEditorProps {
  body: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const BodyEditor: React.FC<BodyEditorProps> = ({ body, onChange, disabled }) => {
  const [isValidJson, setIsValidJson] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!body || body.trim() === "") {
      setIsValidJson(null);
      return;
    }
    try {
      JSON.parse(body);
      setIsValidJson(true);
    } catch {
      setIsValidJson(false);
    }
  }, [body]);

  const handlePrettify = () => {
    if (!body || body.trim() === "") return;
    try {
      const parsed = JSON.parse(body);
      onChange(JSON.stringify(parsed, null, 2));
    } catch {
      // Keep body unchanged if invalid
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-mono text-text-muted">
        <span>Request Body (JSON Format)</span>
        <div className="flex items-center gap-2">
          {isValidJson === true && (
            <span className="text-[11px] font-mono text-emerald-600">✓ Valid JSON</span>
          )}
          {isValidJson === false && (
            <span className="text-[11px] font-mono text-semantic-error-fg font-semibold">
              ⚠ Malformed JSON
            </span>
          )}
          <button
            type="button"
            onClick={handlePrettify}
            disabled={disabled || !body.trim()}
            className="text-[11px] font-mono text-text-secondary hover:text-brand-black disabled:opacity-40"
          >
            Prettify JSON
          </button>
        </div>
      </div>

      <Textarea
        value={body}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={`{\n  "name": "Requestly",\n  "version": "1.0"\n}`}
        rows={8}
        className={`font-mono text-xs p-3 leading-relaxed bg-background-elevated ${
          isValidJson === false
            ? "border-red-400 focus:border-red-600 focus:ring-red-500"
            : "border-border-default"
        }`}
      />
    </div>
  );
};
