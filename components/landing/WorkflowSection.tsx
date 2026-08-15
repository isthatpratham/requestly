import * as React from "react";

const steps = [
  {
    n: "1",
    verb: "Find",
    headline: "Browse the catalog",
    body: "Search 1,670 public APIs by category, auth method, HTTPS, or CORS support. Filter to the exact type of API you need. Click through to full technical details.",
    code: "GET /api/apis?category=Finance&https=true",
  },
  {
    n: "2",
    verb: "Test",
    headline: "Run in the Playground",
    body: "Open any API directly in the Playground with one click. Configure method, URL, query params, headers, and authentication. Execute the request server-side and inspect the live response.",
    code: "POST /api/request → 200 OK · 142ms",
  },
  {
    n: "3",
    verb: "Ship",
    headline: "Export the code",
    body: "After confirming the API works, export the working configuration as cURL, JavaScript (Fetch API), or Python (Requests library). Paste into your codebase and integrate immediately.",
    code: "curl -X GET 'https://api.example.com/data' -H 'Accept: application/json'",
  },
];

export const WorkflowSection: React.FC = () => {
  return (
    <section className="border-b border-border-default py-20 md:py-28 bg-background-secondary">
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-4">
            Workflow
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-brand-black leading-[1.1] tracking-tight max-w-xl text-balance">
            From discovery to working integration code.
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="grid grid-cols-1 md:grid-cols-[60px_1fr_auto] gap-4 md:gap-10 py-8 border-t border-border-default first:border-t-0"
            >
              {/* Step number */}
              <div className="font-mono text-[10px] tracking-widest text-text-disabled uppercase flex md:flex-col items-center md:items-start gap-3">
                <span className="text-2xl font-semibold text-brand-black">{step.n}</span>
                <span className="text-[10px]">{step.verb}</span>
                {i < steps.length - 1 && (
                  <div className="hidden md:block w-px h-6 bg-border-default mt-1 ml-px" aria-hidden />
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-display text-xl md:text-2xl font-medium text-brand-black tracking-tight">
                  {step.headline}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                  {step.body}
                </p>
              </div>

              {/* Code sample */}
              <div className="self-start md:self-center">
                <code className="block font-mono text-[10px] text-text-muted bg-background-code border border-border-default px-3 py-2 rounded-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">
                  {step.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
