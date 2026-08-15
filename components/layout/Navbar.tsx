"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { useTheme } from "@/components/layout/ThemeProvider";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "h-7 w-7 flex items-center justify-center rounded-xs",
        "text-text-muted hover:text-text-primary hover:bg-background-secondary",
        "transition-colors duration-[var(--dur-interface)]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue"
      )}
    >
      {resolvedTheme === "dark" ? (
        /* Sun icon */
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        /* Moon icon */
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M13.5 10A6.5 6.5 0 016 2.5c0-.47.05-.93.14-1.37A6.5 6.5 0 1014.87 9.86c-.44.09-.9.14-1.37.14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "flex items-center justify-center",
        "px-4 pt-3 pb-0",
        "pointer-events-none"
      )}
      role="banner"
    >
      {/* ── Floating Nav Bar ─────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={cn(
          "pointer-events-auto",
          "w-full max-w-3xl",
          "flex items-center justify-between",
          "h-11 px-4",
          "rounded-sm border",
          "transition-all duration-[var(--dur-transition)] ease-[var(--ease-standard)]",
          scrolled
            ? [
                "bg-background-elevated/90 backdrop-blur-md",
                "border-border-default",
                "shadow-float",
              ]
            : [
                "bg-background-primary/80 backdrop-blur-sm",
                "border-border-subtle",
              ]
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2",
            "font-mono text-xs font-bold tracking-tight text-brand-black",
            "hover:opacity-70 transition-opacity duration-[var(--dur-micro)]",
            "focus-visible:outline-none"
          )}
        >
          <span
            className="h-5 w-5 bg-brand-black text-brand-white flex items-center justify-center rounded-xs text-[10px] font-black leading-none select-none"
            aria-hidden
          >
            R
          </span>
          <span className="hidden sm:inline">{APP_NAME}</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-0.5" role="list">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-xs text-[11px] font-medium tracking-wide",
                    "transition-colors duration-[var(--dur-micro)]",
                    isActive
                      ? "bg-background-secondary text-text-primary font-semibold"
                      : "text-text-secondary hover:text-text-primary hover:bg-background-secondary/70"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className={cn(
              "md:hidden h-7 w-7 flex items-center justify-center rounded-xs",
              "text-text-muted hover:text-text-primary hover:bg-background-secondary",
              "transition-colors duration-[var(--dur-micro)]"
            )}
          >
            {mobileOpen ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                <path d="M0 1h14M0 5h14M0 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className={cn(
            "pointer-events-auto",
            "absolute top-[60px] left-4 right-4",
            "rounded-sm border border-border-default",
            "bg-background-elevated/95 backdrop-blur-md shadow-float",
            "py-2 animate-fade-in"
          )}
          role="navigation"
          aria-label="Mobile navigation"
        >
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
                  "block px-4 py-2.5 text-xs font-medium",
                  "transition-colors duration-[var(--dur-micro)]",
                  isActive
                    ? "text-text-primary font-semibold bg-background-secondary"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-secondary/60"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
