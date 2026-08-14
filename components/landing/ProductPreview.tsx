"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { MOCK_CATALOG_APIS, MOCK_REQUEST_SAMPLES } from "@/data/mockLandingData";

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"explorer" | "playground" | "codegen">("playground");
  const [selectedApiId, setSelectedApiId] = React.useState<string>("open-meteo");
  const [selectedLang, setSelectedLang] = React.useState<"curl" | "javascript" | "python">("javascript");

  const [isLoadingRequest, setIsLoadingRequest] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  const activeSample = MOCK_REQUEST_SAMPLES[selectedApiId] || MOCK_REQUEST_SAMPLES["open-meteo"];

  const handleSendRequest = () => {
    setIsLoadingRequest(true);
    setTimeout(() => {
      setIsLoadingRequest(false);
    }, 350);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 md:py-24 border-b border-border-default bg-background-secondary">
      <Container className="space-y-8">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono uppercase text-text-muted tracking-wider">
            04 // PRODUCT INTERFACE PREVIEW
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-brand-black">
            Experience the Requestly workspace.
          </h2>
          <p className="text-sm font-normal text-text-secondary leading-relaxed">
            Test how Requestly combines API exploration, live response inspection, and code generation.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex border-b border-border-default space-x-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("explorer")}
            className={`px-4 py-2 text-xs font-mono font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "explorer"
                ? "border-brand-black text-brand-black font-semibold"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            01 // API CATALOG EXPLORER
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("playground")}
            className={`px-4 py-2 text-xs font-mono font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "playground"
                ? "border-brand-black text-brand-black font-semibold"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            02 // PLAYGROUND & RESPONSE VIEWER
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("codegen")}
            className={`px-4 py-2 text-xs font-mono font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "codegen"
                ? "border-brand-black text-brand-black font-semibold"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            03 // CODE GENERATOR
          </button>
        </div>

        {/* Preview Frame */}
        <div className="rounded-sm border border-border-default bg-background-elevated overflow-hidden shadow-subtle">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-subtle bg-background-secondary text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="ml-2 text-[11px] text-text-secondary">
                {activeTab === "explorer" && "requestly://catalog/explore"}
                {activeTab === "playground" && `requestly://playground?target=${activeSample.url}`}
                {activeTab === "codegen" && `requestly://codegen?lang=${selectedLang}`}
              </span>
            </div>
            <div className="text-[11px] uppercase text-text-disabled">INTERACTIVE DEMO</div>
          </div>

          {/* Tab 1: Catalog Explorer Preview */}
          {activeTab === "explorer" && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Search catalog APIs by name or description..." defaultValue="Weather" className="sm:w-80" />
                <Select
                  options={[
                    { value: "all", label: "All Categories" },
                    { value: "Weather", label: "Weather" },
                    { value: "Development", label: "Development" },
                    { value: "Finance", label: "Finance" },
                  ]}
                  className="sm:w-48"
                />
              </div>

              <div className="space-y-3">
                {MOCK_CATALOG_APIS.map((api) => (
                  <div
                    key={api.id}
                    className="p-4 rounded-sm border border-border-default bg-background-primary flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-border-strong transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-brand-black">{api.name}</h4>
                        <Badge variant="outline" size="sm">
                          {api.category}
                        </Badge>
                        <Badge variant="operational" size="sm">
                          Operational
                        </Badge>
                      </div>
                      <p className="text-xs text-text-secondary">{api.description}</p>
                      <div className="font-mono text-[11px] text-text-muted">{api.url}</div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedApiId(api.id);
                        setActiveTab("playground");
                      }}
                      className="shrink-0"
                    >
                      Test in Playground →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Playground & Response Viewer Preview */}
          {activeTab === "playground" && (
            <div className="p-6 space-y-6">
              {/* Request Controls Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pb-4 border-b border-border-subtle">
                <div className="w-24 shrink-0">
                  <Select
                    value={activeSample.method}
                    onChange={() => {}}
                    options={[
                      { value: "GET", label: "GET" },
                      { value: "POST", label: "POST" },
                    ]}
                  />
                </div>
                <Input value={activeSample.url} readOnly className="font-mono text-xs flex-1" />
                <Button
                  variant="primary"
                  size="md"
                  isLoading={isLoadingRequest}
                  onClick={handleSendRequest}
                  className="shrink-0 px-6 font-mono"
                >
                  Send Request
                </Button>
              </div>

              {/* Sample API Preset Switcher */}
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                <span>Preset APIs:</span>
                {Object.keys(MOCK_REQUEST_SAMPLES).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedApiId(key)}
                    className={`px-2 py-0.5 rounded-xs border text-[11px] ${
                      selectedApiId === key
                        ? "border-brand-black bg-brand-black text-brand-white"
                        : "border-border-default hover:bg-background-secondary text-text-secondary"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Response Panel */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs border-b border-border-subtle pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-text-muted uppercase">Response</span>
                    <Badge variant="operational">{activeSample.status} {activeSample.statusText}</Badge>
                    <span className="text-text-muted">{activeSample.responseTime} ms</span>
                  </div>
                  <div className="text-text-muted text-[11px]">
                    Content-Type: {activeSample.headers["content-type"]}
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto max-h-72">
                  <pre>{JSON.stringify(activeSample.responseBody, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Code Generator Preview */}
          {activeTab === "codegen" && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-text-muted">Target Language:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedLang("curl")}
                    className={`px-3 py-1 text-xs font-mono rounded-xs border ${
                      selectedLang === "curl"
                        ? "bg-brand-black text-brand-white border-brand-black"
                        : "bg-background-elevated text-text-secondary border-border-default"
                    }`}
                  >
                    cURL
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLang("javascript")}
                    className={`px-3 py-1 text-xs font-mono rounded-xs border ${
                      selectedLang === "javascript"
                        ? "bg-brand-black text-brand-white border-brand-black"
                        : "bg-background-elevated text-text-secondary border-border-default"
                    }`}
                  >
                    JavaScript (Fetch)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLang("python")}
                    className={`px-3 py-1 text-xs font-mono rounded-xs border ${
                      selectedLang === "python"
                        ? "bg-brand-black text-brand-white border-brand-black"
                        : "bg-background-elevated text-text-secondary border-border-default"
                    }`}
                  >
                    Python (Requests)
                  </button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyCode(activeSample.codeSnippets[selectedLang])}
                  className="font-mono text-xs"
                >
                  {copied ? "✓ Copied" : "Copy Code"}
                </Button>
              </div>

              <div className="p-4 rounded-sm bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto">
                <pre>{activeSample.codeSnippets[selectedLang]}</pre>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
