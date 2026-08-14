import * as React from "react";
import { AuthConfig, AuthType } from "@/types/api";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";

export interface AuthEditorProps {
  auth: AuthConfig;
  onChange: (auth: AuthConfig) => void;
}

export const AuthEditor: React.FC<AuthEditorProps> = ({ auth, onChange }) => {
  const handleTypeChange = (newType: AuthType) => {
    onChange({
      ...auth,
      type: newType,
      apiKey: auth.apiKey || { key: "X-API-Key", value: "", location: "header" },
      bearer: auth.bearer || { token: "" },
      basic: auth.basic || { username: "", password: "" },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-mono text-text-muted">
        <span>Outbound Authentication</span>
      </div>

      <div className="max-w-xs">
        <Select
          value={auth.type}
          onChange={(e) => handleTypeChange(e.target.value as AuthType)}
          options={[
            { value: "none", label: "No Authentication" },
            { value: "apiKey", label: "API Key" },
            { value: "bearer", label: "Bearer Token" },
            { value: "basic", label: "Basic Auth (Username/Password)" },
          ]}
        />
      </div>

      {/* Auth Type Specific Editors */}
      {auth.type === "apiKey" && (
        <div className="p-3 rounded-xs border border-border-subtle bg-background-secondary space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">Key Name</label>
              <Input
                type="text"
                value={auth.apiKey?.key || "X-API-Key"}
                onChange={(e) =>
                  onChange({
                    ...auth,
                    apiKey: { ...auth.apiKey!, key: e.target.value },
                  })
                }
                placeholder="X-API-Key"
                className="h-8 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">Key Location</label>
              <Select
                value={auth.apiKey?.location || "header"}
                onChange={(e) =>
                  onChange({
                    ...auth,
                    apiKey: {
                      ...auth.apiKey!,
                      location: e.target.value as "header" | "query",
                    },
                  })
                }
                options={[
                  { value: "header", label: "HTTP Header" },
                  { value: "query", label: "URL Query Parameter" },
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted mb-1">Key Secret Value</label>
            <Input
              type="password"
              value={auth.apiKey?.value || ""}
              onChange={(e) =>
                onChange({
                  ...auth,
                  apiKey: { ...auth.apiKey!, value: e.target.value },
                })
              }
              placeholder="Paste secret key..."
              className="h-8 font-mono text-xs"
            />
          </div>
        </div>
      )}

      {auth.type === "bearer" && (
        <div className="p-3 rounded-xs border border-border-subtle bg-background-secondary space-y-2">
          <label className="block text-[11px] font-mono text-text-muted mb-1">Bearer Token</label>
          <Input
            type="password"
            value={auth.bearer?.token || ""}
            onChange={(e) =>
              onChange({
                ...auth,
                bearer: { token: e.target.value },
              })
            }
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="h-8 font-mono text-xs"
          />
        </div>
      )}

      {auth.type === "basic" && (
        <div className="p-3 rounded-xs border border-border-subtle bg-background-secondary space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">Username</label>
              <Input
                type="text"
                value={auth.basic?.username || ""}
                onChange={(e) =>
                  onChange({
                    ...auth,
                    basic: { ...auth.basic!, username: e.target.value },
                  })
                }
                placeholder="Username"
                className="h-8 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted mb-1">Password</label>
              <Input
                type="password"
                value={auth.basic?.password || ""}
                onChange={(e) =>
                  onChange({
                    ...auth,
                    basic: { ...auth.basic!, password: e.target.value },
                  })
                }
                placeholder="Password"
                className="h-8 font-mono text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
