import * as React from "react";
import { Container } from "@/components/ui/Container";

const CAPABILITIES = [
  {
    title: "Catalog Search & Filtering",
    description: "Instantly filter public APIs by category, authentication requirement, HTTPS support, and CORS availability.",
    tag: "DISCOVERY",
  },
  {
    title: "Live Health Verification",
    description: "Check actual endpoint reachability, HTTP status code, and millisecond latency before integrating.",
    tag: "RELIABILITY",
  },
  {
    title: "Arbitrary Request Builder",
    description: "Execute GET, POST, PUT, PATCH, and DELETE requests to any target URL with query params, headers, and JSON bodies.",
    tag: "PLAYGROUND",
  },
  {
    title: "Authentication Support",
    description: "Configure API Key (Header or Query), Bearer Tokens, and Basic Auth securely for request testing.",
    tag: "SECURITY",
  },
  {
    title: "Multi-Language Snippets",
    description: "Export configured API requests as ready-to-copy cURL commands, JavaScript Fetch calls, or Python Requests code.",
    tag: "CODEGEN",
  },
  {
    title: "100% Local Browser Storage",
    description: "Save collections and maintain request history locally in your browser. Zero tracking, zero accounts required.",
    tag: "PRIVACY",
  },
];

export const CapabilitiesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-b border-border-default bg-background-primary">
      <Container className="space-y-12">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono uppercase text-text-muted tracking-wider">
            03 // CORE CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-brand-black">
            Built specifically for developer speed and privacy.
          </h2>
          <p className="text-sm font-normal text-text-secondary leading-relaxed">
            Every feature is designed to reduce friction when evaluating public APIs or testing endpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="p-6 rounded-sm border border-border-default bg-background-elevated space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-text-muted border border-border-subtle px-1.5 py-0.5 rounded-xs">
                  {cap.tag}
                </span>
              </div>
              <h3 className="text-base font-semibold text-brand-black tracking-tight">
                {cap.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
