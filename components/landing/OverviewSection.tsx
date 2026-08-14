import * as React from "react";
import { Container } from "@/components/ui/Container";

export const OverviewSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-b border-border-default">
      <Container className="space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono uppercase text-text-muted tracking-wider">
            01 // PRODUCT OVERVIEW
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-brand-black">
            API discovery and experimentation combined in one focused workspace.
          </h2>
          <p className="text-sm font-normal text-text-secondary leading-relaxed">
            Finding an API is only the first step. Developers need to know whether an API is reachable, what parameters it requires, what a real response looks like, and how to write the integration code.
          </p>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-sm border border-border-default bg-background-elevated space-y-3">
            <div className="font-mono text-xs text-text-muted font-semibold">01 / DISCOVERY</div>
            <h3 className="text-base font-semibold text-brand-black tracking-tight">
              Curated Public Catalog
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Explore normalized metadata across hundreds of public APIs. Search by category, authentication requirement, HTTPS support, and CORS capability.
            </p>
          </div>

          <div className="p-6 rounded-sm border border-border-default bg-background-elevated space-y-3">
            <div className="font-mono text-xs text-text-muted font-semibold">02 / EXPERIMENTATION</div>
            <h3 className="text-base font-semibold text-brand-black tracking-tight">
              Arbitrary Request Engine
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Test any URL directly in the Playground. Configure custom headers, query parameters, request bodies, and authentication headers in seconds.
            </p>
          </div>

          <div className="p-6 rounded-sm border border-border-default bg-background-elevated space-y-3">
            <div className="font-mono text-xs text-text-muted font-semibold">03 / INTEGRATION</div>
            <h3 className="text-base font-semibold text-brand-black tracking-tight">
              Instant Code Generation
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Convert working request configurations into clean cURL, JavaScript (Fetch), and Python (Requests) snippets ready to paste into your codebase.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
