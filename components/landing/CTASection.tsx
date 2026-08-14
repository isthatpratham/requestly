import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background-primary">
      <Container>
        <div className="p-8 md:p-14 rounded-sm border border-border-default bg-background-elevated space-y-6 text-left max-w-4xl mx-auto shadow-subtle">
          <div className="text-xs font-mono uppercase text-text-muted tracking-wider">
            REQUESTLY // GET STARTED
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brand-black leading-tight max-w-2xl">
            Start exploring and testing public APIs in seconds.
          </h2>
          <p className="text-sm font-normal text-text-secondary leading-relaxed max-w-xl">
            No account required. No registration, no user tracking, no cloud lock-in. Explore the catalog or test arbitrary endpoints directly in your browser.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/explore">
              <Button variant="primary" size="lg" className="px-6 font-medium">
                Explore API Catalog →
              </Button>
            </Link>
            <Link href="/playground">
              <Button variant="outline" size="lg" className="px-6 font-medium">
                Open Playground
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
