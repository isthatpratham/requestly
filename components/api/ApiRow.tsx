import * as React from "react";
import Link from "next/link";
import { ApiItem } from "@/types/api";
import { cn } from "@/lib/utils";

interface ApiRowProps {
  api: ApiItem;
}

function authLabel(auth: string | null): string {
  if (!auth || auth.toLowerCase() === "no") return "None";
  return auth;
}

function corsLabel(cors: string | null | undefined): string {
  if (!cors || cors === "unknown") return "?";
  if (cors.toLowerCase() === "yes") return "CORS";
  return "No CORS";
}

function httpsIndicator(https: boolean) {
  return https ? (
    <span className="font-mono text-[10px] text-semantic-success" title="HTTPS">
      HTTPS
    </span>
  ) : (
    <span className="font-mono text-[10px] text-text-disabled" title="HTTP only">
      HTTP
    </span>
  );
}

export const ApiRow: React.FC<ApiRowProps> = ({ api }) => {
  return (
    <Link
      href={`/explore/${api.id}`}
      className={cn(
        "group flex items-start gap-4 px-4 py-3.5",
        "border-b border-border-subtle last:border-b-0",
        "hover:bg-background-secondary",
        "transition-colors duration-[var(--dur-micro)]",
        "focus-visible:outline-none focus-visible:bg-background-secondary focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent-blue"
      )}
      aria-label={`View ${api.name} API details`}
    >
      {/* Category dot */}
      <div className="flex-none pt-1">
        <span
          className="block h-2 w-2 rounded-full bg-border-strong group-hover:bg-accent-blue transition-colors duration-[var(--dur-micro)]"
          aria-hidden
        />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-1 sm:gap-4 items-start">
        {/* Left: name + description */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-[var(--dur-micro)] truncate">
              {api.name}
            </span>
            <span className="font-mono text-[10px] text-text-muted bg-background-secondary border border-border-subtle px-1.5 py-0.5 rounded-xs shrink-0">
              {api.category}
            </span>
          </div>
          {api.description && (
            <p className="mt-0.5 text-xs text-text-muted leading-relaxed truncate max-w-lg">
              {api.description}
            </p>
          )}
        </div>

        {/* Right: technical metadata */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
          {httpsIndicator(api.https)}
          <span className="font-mono text-[10px] text-text-muted">
            {corsLabel(api.cors)}
          </span>
          {api.auth && api.auth.toLowerCase() !== "no" && (
            <span className="font-mono text-[10px] text-text-secondary border border-border-default px-1.5 py-0.5 rounded-xs">
              {authLabel(api.auth)}
            </span>
          )}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            className="text-text-disabled group-hover:text-text-muted transition-colors duration-[var(--dur-micro)]"
          >
            <path
              d="M4.5 2.5l3 3.5-3 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
