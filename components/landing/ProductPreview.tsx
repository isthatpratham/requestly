"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { MOCK_CATALOG_APIS, MOCK_REQUEST_SAMPLES } from "@/data/mockLandingData";

/* ─────────────────────────────────────────────
   macOS Traffic Light dots
───────────────────────────────────────────── */
const TrafficLights: React.FC = () => (
  <div className="flex items-center gap-[6px]">
    {/* Close — red */}
    <div
      className="h-3 w-3 rounded-full bg-[#FF5F57] border border-[#E0443E] flex items-center justify-center group"
      title="Close"
    >
      <svg className="opacity-0 group-hover:opacity-100 transition-opacity" width="6" height="6" viewBox="0 0 6 6" fill="none">
        <path d="M1 1l4 4M5 1L1 5" stroke="#7A1211" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    </div>
    {/* Minimise — yellow */}
    <div
      className="h-3 w-3 rounded-full bg-[#FEBC2E] border border-[#D69F29] flex items-center justify-center group"
      title="Minimise"
    >
      <svg className="opacity-0 group-hover:opacity-100 transition-opacity" width="6" height="2" viewBox="0 0 6 2" fill="none">
        <path d="M0.5 1h5" stroke="#7A5A00" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    </div>
    {/* Fullscreen — green */}
    <div
      className="h-3 w-3 rounded-full bg-[#28C840] border border-[#1FAD2F] flex items-center justify-center group"
      title="Full Screen"
    >
      <svg className="opacity-0 group-hover:opacity-100 transition-opacity" width="6" height="6" viewBox="0 0 6 6" fill="none">
        <path d="M1 5L5 1M1 1h4v4" stroke="#0A5A14" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   macOS Title Bar
───────────────────────────────────────────── */
const MacTitleBar: React.FC<{ title: string }> = ({ title }) => (
  <div
    className="flex items-center px-4 py-0 h-11 border-b border-[#D1D1D6] select-none shrink-0"
    style={{
      background: "linear-gradient(180deg, #ECECEC 0%, #D6D6D6 100%)",
    }}
  >
    {/* Left: traffic lights */}
    <div className="flex items-center w-[60px]">
      <TrafficLights />
    </div>

    {/* Centre: window title */}
    <div className="flex-1 flex items-center justify-center">
      <span className="text-[12px] font-medium text-[#3C3C3C] tracking-[-0.01em] truncate max-w-[320px]">
        {title}
      </span>
    </div>

    {/* Right: spacer to balance left */}
    <div className="w-[60px]" />
  </div>
);

/* ─────────────────────────────────────────────
   macOS Toolbar (address bar row)
───────────────────────────────────────────── */
const MacToolbar: React.FC<{ url: string }> = ({ url }) => (
  <div
    className="flex items-center gap-3 px-4 py-2 border-b border-[#D1D1D6] shrink-0"
    style={{ background: "#E8E8E8" }}
  >
    {/* Nav buttons */}
    <div className="flex items-center gap-1">
      <button className="h-5 w-5 rounded-full flex items-center justify-center text-[#999] hover:bg-[#C8C8C8] transition-colors" aria-label="Back">
        <svg width="7" height="11" viewBox="0 0 7 11" fill="none"><path d="M6 1L1 5.5L6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button className="h-5 w-5 rounded-full flex items-center justify-center text-[#C8C8C8] cursor-not-allowed" aria-label="Forward">
        <svg width="7" height="11" viewBox="0 0 7 11" fill="none"><path d="M1 1L6 5.5L1 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>

    {/* Address bar */}
    <div
      className="flex-1 flex items-center gap-2 px-3 h-[26px] rounded-[5px] text-[11px] font-mono text-[#555] truncate"
      style={{ background: "linear-gradient(180deg, #FFF 0%, #F7F7F7 100%)", border: "1px solid #C0C0C0", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)" }}
    >
      {/* Lock icon */}
      <svg width="9" height="11" viewBox="0 0 9 11" fill="none" className="text-[#34C759] shrink-0">
        <rect x="1" y="4.5" width="7" height="6" rx="1.2" fill="currentColor"/>
        <path d="M2.5 4.5V3a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      </svg>
      <span className="truncate">{url}</span>
    </div>

    {/* Reload */}
    <button className="h-5 w-5 flex items-center justify-center text-[#888] hover:text-[#444] transition-colors" aria-label="Reload">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M9.5 5.5A4 4 0 012 3.2M1.5 5.5A4 4 0 009 7.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M9.5 2v3.5H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </div>
);

/* ─────────────────────────────────────────────
   macOS Sidebar tab strip (left panel)
───────────────────────────────────────────── */
const MacSidebar: React.FC<{
  activeTab: string;
  setActiveTab: (t: "explorer" | "playground" | "codegen") => void;
}> = ({ activeTab, setActiveTab }) => {
  const items: { id: "explorer" | "playground" | "codegen"; label: string; icon: React.ReactNode }[] = [
    {
      id: "explorer",
      label: "API Catalog",
      icon: (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <rect x="1" y="1" width="11" height="3" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="1" y="6" width="11" height="3" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M1 11.5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "playground",
      label: "Playground",
      icon: (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <polygon points="3,2 11,6.5 3,11" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "codegen",
      label: "Code Export",
      icon: (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M4 4L1.5 6.5L4 9M9 4l2.5 2.5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 2.5l-2 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      className="flex flex-col w-40 shrink-0 border-r border-[#D1D1D6] py-2"
      style={{ background: "#F0F0F0" }}
    >
      <div className="px-3 pb-1 pt-1">
        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#999]">Views</span>
      </div>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setActiveTab(item.id)}
          className={`flex items-center gap-2 px-3 py-[7px] text-[12px] font-medium transition-colors text-left ${
            activeTab === item.id
              ? "bg-[#007AFF] text-white rounded-[6px] mx-1"
              : "text-[#3C3C3C] hover:bg-[#D8D8D8] rounded-[6px] mx-1"
          }`}
        >
          <span className={activeTab === item.id ? "text-white" : "text-[#666]"}>{item.icon}</span>
          {item.label}
        </button>
      ))}

      {/* Status bar at bottom of sidebar */}
      <div className="mt-auto px-3 pt-3 border-t border-[#D1D1D6]">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
          <span className="text-[9px] text-[#888] font-mono">Connected</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main ProductPreview component
───────────────────────────────────────────── */
export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"explorer" | "playground" | "codegen">("playground");
  const [selectedApiId, setSelectedApiId] = React.useState<string>("open-meteo");
  const [selectedLang, setSelectedLang] = React.useState<"curl" | "javascript" | "python">("javascript");
  const [isLoadingRequest, setIsLoadingRequest] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  const activeSample = MOCK_REQUEST_SAMPLES[selectedApiId] || MOCK_REQUEST_SAMPLES["open-meteo"];

  const handleSendRequest = () => {
    setIsLoadingRequest(true);
    setTimeout(() => setIsLoadingRequest(false), 480);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toolbarUrl =
    activeTab === "explorer"
      ? "requestly.app/explore"
      : activeTab === "playground"
      ? `requestly.app/playground?api=${selectedApiId}`
      : `requestly.app/playground?lang=${selectedLang}`;

  const windowTitle =
    activeTab === "explorer"
      ? "API Catalog Explorer — Requestly"
      : activeTab === "playground"
      ? `${activeSample.method} ${activeSample.url.split("?")[0].replace("https://", "")} — Playground`
      : `Code Export · ${selectedLang} — Requestly`;

  return (
    <section className="py-16 md:py-24 border-b border-border-default">
      <Container className="space-y-10">
        {/* Section header */}
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

        {/* ── macOS Window ── */}
        <div
          className="rounded-[12px] overflow-hidden w-full"
          style={{
            boxShadow:
              "0 0 0 1px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)",
          }}
        >
          {/* Title bar */}
          <MacTitleBar title={windowTitle} />

          {/* Toolbar / address bar */}
          <MacToolbar url={toolbarUrl} />

          {/* Body: sidebar + content */}
          <div className="flex" style={{ background: "#FAFAFA", minHeight: 420 }}>

            {/* Sidebar */}
            <MacSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content area */}
            <div className="flex-1 overflow-hidden flex flex-col">

              {/* ── Tab 1: Catalog Explorer ── */}
              {activeTab === "explorer" && (
                <div className="p-5 space-y-4 overflow-y-auto flex-1">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Search catalog APIs..."
                      defaultValue="Weather"
                      className="sm:w-72 text-xs"
                    />
                    <Select
                      options={[
                        { value: "all", label: "All Categories" },
                        { value: "Weather", label: "Weather" },
                        { value: "Development", label: "Development" },
                        { value: "Finance", label: "Finance" },
                      ]}
                      className="sm:w-40 text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    {MOCK_CATALOG_APIS.map((api) => (
                      <div
                        key={api.id}
                        className="p-3 rounded-[6px] border border-[#E0E0E0] bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-[#B0B0B0] transition-colors"
                        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[12px] font-semibold text-[#1C1C1E]">{api.name}</span>
                            <Badge variant="outline" size="sm">{api.category}</Badge>
                            <Badge variant="operational" size="sm">Operational</Badge>
                          </div>
                          <p className="text-[11px] text-[#666]">{api.description}</p>
                          <div className="font-mono text-[10px] text-[#888]">{api.url}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setSelectedApiId(api.id); setActiveTab("playground"); }}
                          className="shrink-0 text-[11px]"
                        >
                          Test →
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Tab 2: Playground ── */}
              {activeTab === "playground" && (
                <div className="p-5 space-y-4 overflow-y-auto flex-1">
                  {/* Request bar */}
                  <div
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 rounded-[8px] border border-[#E0E0E0] bg-white"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                  >
                    <div className="w-[90px] shrink-0">
                      <Select
                        value={activeSample.method}
                        onChange={() => {}}
                        options={[
                          { value: "GET", label: "GET" },
                          { value: "POST", label: "POST" },
                        ]}
                      />
                    </div>
                    <Input
                      value={activeSample.url}
                      readOnly
                      className="font-mono text-[11px] flex-1"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      isLoading={isLoadingRequest}
                      onClick={handleSendRequest}
                      className="shrink-0 px-5 font-mono text-xs"
                    >
                      Send
                    </Button>
                  </div>

                  {/* API preset switcher */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted flex-wrap">
                    <span className="text-[#888]">Preset:</span>
                    {Object.keys(MOCK_REQUEST_SAMPLES).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedApiId(key)}
                        className={`px-2 py-0.5 rounded-[4px] border text-[10px] transition-colors ${
                          selectedApiId === key
                            ? "border-[#007AFF] bg-[#007AFF] text-white"
                            : "border-[#D0D0D0] hover:bg-[#EFEFEF] text-[#555]"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>

                  {/* Response panel */}
                  <div
                    className="rounded-[8px] border border-[#E0E0E0] overflow-hidden"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                  >
                    {/* Response header bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-[#EBEBEB] bg-[#F5F5F5] text-[11px] font-mono">
                      <div className="flex items-center gap-3">
                        <span className="text-[#888] uppercase tracking-wide">Response</span>
                        <span className="px-1.5 py-0.5 rounded-[3px] bg-[#D1FAE5] text-[#065F46] font-semibold text-[10px]">
                          {activeSample.status} {activeSample.statusText}
                        </span>
                        <span className="text-[#AAA]">{activeSample.responseTime}ms</span>
                      </div>
                      <span className="text-[#BBB] text-[10px]">{activeSample.headers["content-type"]}</span>
                    </div>

                    {/* Response body */}
                    <div className="bg-[#1E1E2E] text-[#CDD6F4] font-mono text-[11px] p-4 overflow-x-auto max-h-52">
                      <pre className="leading-relaxed">{JSON.stringify(activeSample.responseBody, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Tab 3: Code Export ── */}
              {activeTab === "codegen" && (
                <div className="p-5 space-y-4 overflow-y-auto flex-1">
                  {/* Language picker + copy */}
                  <div
                    className="flex items-center justify-between p-3 rounded-[8px] border border-[#E0E0E0] bg-white"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#888]">Language:</span>
                      {(["curl", "javascript", "python"] as const).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setSelectedLang(lang)}
                          className={`px-3 py-1 text-[11px] font-mono rounded-[5px] border transition-colors ${
                            selectedLang === lang
                              ? "bg-[#007AFF] text-white border-[#007AFF]"
                              : "bg-[#F5F5F5] text-[#555] border-[#D0D0D0] hover:bg-[#EBEBEB]"
                          }`}
                        >
                          {lang === "curl" ? "cURL" : lang === "javascript" ? "JS Fetch" : "Python"}
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyCode(activeSample.codeSnippets[selectedLang])}
                      className="font-mono text-[11px]"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </Button>
                  </div>

                  {/* Code panel */}
                  <div
                    className="rounded-[8px] border border-[#2A2A3A] overflow-hidden"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
                  >
                    {/* Code window chrome */}
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-[#2A2A3A] bg-[#181825]">
                      <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                      <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                      <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                      <span className="ml-2 text-[10px] font-mono text-[#6C7086]">
                        {selectedLang === "curl" ? "terminal" : selectedLang === "javascript" ? "snippet.js" : "snippet.py"}
                      </span>
                    </div>
                    <div className="bg-[#1E1E2E] text-[#CDD6F4] font-mono text-[11px] p-5 overflow-x-auto">
                      <pre className="leading-relaxed whitespace-pre">{activeSample.codeSnippets[selectedLang]}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* macOS status bar at window bottom */}
              <div
                className="flex items-center justify-between px-4 py-1.5 border-t border-[#D1D1D6] text-[10px] font-mono text-[#888] shrink-0"
                style={{ background: "#EBEBEB" }}
              >
                <span>Requestly · Developer Workspace</span>
                <span className="tabular-nums">
                  {activeTab === "playground" ? `${activeSample.responseTime}ms · ${activeSample.status} ${activeSample.statusText}` : "Ready"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
