import * as React from "react";

const capabilities = [
  { feature: "API Catalog",         detail: "1,670+ curated public APIs" },
  { feature: "Live Health Checks",  detail: "Server-side reachability & latency" },
  { feature: "Request Execution",   detail: "GET / POST / PUT / PATCH / DELETE" },
  { feature: "Query Parameters",    detail: "Key-value editor with toggle control" },
  { feature: "Custom Headers",      detail: "Arbitrary header injection" },
  { feature: "Authentication",      detail: "API Key · Bearer Token · Basic Auth" },
  { feature: "Request Body",        detail: "Raw JSON with monospace editor" },
  { feature: "Response Inspection", detail: "Status · Latency · Headers · Body" },
  { feature: "Code Generation",     detail: "cURL · JavaScript Fetch · Python Requests" },
  { feature: "Request History",     detail: "Browser-local, credential-scrubbed log" },
  { feature: "Collections",         detail: "Browser-local API grouping workspace" },
  { feature: "SSRF Protection",     detail: "Private network & loopback blocked" },
  { feature: "No Account Required", detail: "Zero setup, zero tracking" },
  { feature: "Dark / Light Mode",   detail: "Follows system preference" },
];

export const CapabilitiesSection: React.FC = () => {
  return (
    <section className="border-b border-border-default py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-4">
            Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-brand-black leading-tight tracking-tight max-w-lg text-balance">
            Everything a developer needs. Nothing they don&apos;t.
          </h2>
        </div>

        {/* Capability matrix — EB Garamond font for items */}
        <div className="divide-y divide-border-subtle">
          {capabilities.map((c) => (
            <div
              key={c.feature}
              className="grid grid-cols-1 sm:grid-cols-2 gap-1 py-3.5 hover:bg-background-secondary transition-colors duration-[var(--dur-micro)] -mx-3 px-3 rounded-xs items-center"
            >
              <span className="font-display text-lg font-medium text-brand-black">
                {c.feature}
              </span>
              <span className="font-display text-base text-text-secondary">
                {c.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
