import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RequestlyLogo } from "@/components/ui/RequestlyLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border-default bg-background-primary py-8 mt-auto">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-text-muted">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <RequestlyLogo height={16} />
            </Link>
            <span className="text-text-disabled">|</span>
            <span>API Discovery &amp; Playground</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-text-secondary">
            <Link href="/explore" className="hover:text-brand-black transition-colors">
              Explore
            </Link>
            <Link href="/playground" className="hover:text-brand-black transition-colors">
              Playground
            </Link>
            <Link href="/collections" className="hover:text-brand-black transition-colors">
              Collections
            </Link>
            <Link href="/history" className="hover:text-brand-black transition-colors">
              History
            </Link>
          </div>

          <div className="text-text-disabled font-mono text-[11px]">
            © {new Date().getFullYear()} Requestly.
          </div>
        </div>
      </Container>
    </footer>
  );
};
