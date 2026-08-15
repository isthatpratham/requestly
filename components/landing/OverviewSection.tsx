import * as React from "react";

const pillars = [
  {
    index: "01",
    title: "Discovery",
    description:
      "1,670 public APIs. Normalized metadata: category, authentication, HTTPS, CORS, live health status. A structured catalog you can actually search and trust.",
  },
  {
    index: "02",
    title: "Experimentation",
    description:
      "Execute any HTTP request directly from the server. Custom headers, query parameters, JSON bodies, API key and Bearer token auth — configured in seconds.",
  },
  {
    index: "03",
    title: "Integration",
    description:
      "Export working request configurations as cURL, JavaScript Fetch, or Python Requests snippets. Copy and paste into your codebase without rewriting.",
  },
];

export const OverviewSection: React.FC = () => {
  return (
    <section className="border-b border-border-default py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Section label */}
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
            Product Overview
          </span>
        </div>

        {/* Large editorial statement */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-brand-black leading-[1.1] tracking-[-0.015em] max-w-2xl mb-16 md:mb-20 text-balance">
          API discovery and experimentation in one focused workspace.
        </h2>

        {/* Three pillars — row-based, not card-based */}
        <div className="space-y-0 divide-y divide-border-default">
          {pillars.map((p) => (
            <div
              key={p.index}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4 md:gap-8 py-8 md:py-10 group"
            >
              {/* Number */}
              <div className="font-mono text-[11px] tracking-widest text-text-muted uppercase pt-0.5">
                {p.index}
              </div>

              {/* Title */}
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-brand-black tracking-tight">
                  {p.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
