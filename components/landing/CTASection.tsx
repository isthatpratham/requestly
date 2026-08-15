import * as React from "react";
import Link from "next/link";

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">

          {/* Label */}
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-6">
            Get Started
          </span>

          {/* Large editorial headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-brand-black leading-[1.05] tracking-[-0.02em] text-balance mb-8">
            Ready to explore?
          </h2>

          <p className="text-base text-text-secondary leading-relaxed mb-10 max-w-md">
            Browse the full catalog of public APIs, launch requests in the Playground,
            and export working integration code — no account, no setup.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-brand-black text-brand-white text-sm font-medium hover:opacity-80 transition-opacity duration-[var(--dur-micro)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue"
            >
              Browse the Catalog
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/playground"
              className="text-sm font-medium text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors duration-[var(--dur-micro)]"
            >
              Or open the Playground directly →
            </Link>
          </div>
        </div>

        {/* Horizontal rule decoration */}
        <div className="mt-20 border-t border-border-default" />
      </div>
    </section>
  );
};
