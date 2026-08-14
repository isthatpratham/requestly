import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden border-b border-border-default">
      <Container>
        {/* Header Copy Block */}
        <div className="flex flex-col items-start max-w-3xl space-y-5">
          {/* Small Product Identifier */}
          <div className="inline-flex items-center gap-2">
            <Badge variant="outline" size="sm" className="font-mono uppercase tracking-widest text-[10px]">
              REQUESTLY // PLATFORM
            </Badge>
            <span className="text-xs text-text-muted font-mono">• Zero Config Required</span>
          </div>

          {/* Large Primary Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-black leading-[1.05] text-balance">
            Discover, test, and integrate public APIs.
          </h1>

          {/* Concise Supporting Statement */}
          <p className="text-base sm:text-lg font-normal text-text-secondary leading-relaxed max-w-2xl">
            A focused developer workspace to explore public API catalogs, check live availability, execute arbitrary requests, inspect responses, and generate ready-to-use integration code.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/explore">
              <Button variant="primary" size="lg" className="px-6 font-medium">
                Explore APIs →
              </Button>
            </Link>
            <Link href="/playground">
              <Button variant="outline" size="lg" className="px-6 font-medium">
                Open Playground
              </Button>
            </Link>
          </div>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-1.5">
              <span className="text-brand-black font-semibold">1,200+</span>
              <span>Catalog APIs</span>
            </div>
            <span className="text-border-strong">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-black font-semibold">0</span>
              <span>Account Setup</span>
            </div>
            <span className="text-border-strong">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-black font-semibold">cURL / JS / Py</span>
              <span>Code Gen</span>
            </div>
            <span className="text-border-strong">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-black font-semibold">Local</span>
              <span>Browser Privacy</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
