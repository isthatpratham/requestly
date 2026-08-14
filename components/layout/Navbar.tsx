"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-default bg-background-elevated/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-14 items-center justify-between">
          {/* Logo / Wordmark */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-base tracking-tight text-brand-black hover:opacity-80 transition-opacity"
            >
              <span className="h-5 w-5 bg-brand-black text-brand-white flex items-center justify-center rounded-xs text-xs font-mono font-bold">
                R
              </span>
              <span>{APP_NAME}</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium tracking-tight rounded-xs transition-colors duration-150",
                      isActive
                        ? "bg-background-secondary text-brand-black font-semibold"
                        : "text-text-secondary hover:text-brand-black hover:bg-background-secondary/60"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Status Indicator / Metadata */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-semantic-success-fg animate-pulse" />
              <span>Catalog Foundation Ready</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xs text-text-secondary hover:text-brand-black hover:bg-background-secondary focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <span className="text-sm font-mono">{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-border-subtle space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-xs font-medium tracking-tight rounded-xs transition-colors",
                    isActive
                      ? "bg-background-secondary text-brand-black font-semibold"
                      : "text-text-secondary hover:text-brand-black"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </header>
  );
};
