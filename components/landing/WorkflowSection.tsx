import * as React from "react";
import { Container } from "@/components/ui/Container";

const WORKFLOW_STEPS = [
  {
    step: "01",
    name: "Discover",
    description: "Find public APIs across categories like Weather, Finance, Games, AI, and Infrastructure.",
  },
  {
    step: "02",
    name: "Inspect",
    description: "Review detailed API metadata, authentication requirements, HTTPS, and CORS support.",
  },
  {
    step: "03",
    name: "Test",
    description: "Launch the Playground to execute GET, POST, PUT, or DELETE requests with custom params.",
  },
  {
    step: "04",
    name: "Understand",
    description: "Inspect live response status codes, exact latency, formatted JSON bodies, and headers.",
  },
  {
    step: "05",
    name: "Generate",
    description: "Export configured requests as production-ready cURL, JavaScript, or Python snippets.",
  },
  {
    step: "06",
    name: "Reuse",
    description: "Save APIs to browser-local collections and revisit request history without an account.",
  },
];

export const WorkflowSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-b border-border-default">
      <Container className="space-y-12">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono uppercase text-text-muted tracking-wider">
            02 // DEVELOPER WORKFLOW
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-brand-black">
            From API discovery to production code in six steps.
          </h2>
          <p className="text-sm font-normal text-text-secondary leading-relaxed">
            Eliminate friction between evaluating an API and writing the first line of code.
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOW_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-2 hover:border-border-strong transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-text-muted font-bold">{item.step}</span>
                <span className="text-[10px] font-mono text-text-disabled uppercase">PHASE</span>
              </div>
              <h3 className="text-base font-semibold text-brand-black tracking-tight">
                {item.name}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
