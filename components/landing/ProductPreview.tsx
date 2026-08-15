import * as React from "react";

/* Terminal-style API request/response visualization */
export const ProductPreview: React.FC = () => {
  return (
    <section className="border-b border-border-default py-20 md:py-28 bg-background-secondary">
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted block mb-4">
            Request Playground
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-brand-black leading-tight tracking-tight max-w-lg text-balance">
            A real API workspace. Not a form.
          </h2>
        </div>

        {/* Terminal mock */}
        <div className="border border-border-default rounded-xs bg-background-code overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-default bg-background-elevated">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            </div>
            <span className="font-mono text-[10px] text-text-muted mx-auto">
              Requestly — API Playground
            </span>
          </div>

          {/* Request panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-default">

            {/* Request */}
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">Request</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-accent-blue uppercase px-2 py-1 border border-accent-blue rounded-xs bg-accent-blue-muted">
                  GET
                </span>
                <code className="font-mono text-[11px] text-text-secondary truncate">
                  https://api.github.com/users/octocat
                </code>
              </div>

              <div className="space-y-1.5">
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Headers</div>
                <div className="space-y-1">
                  {[
                    ["Accept", "application/json"],
                    ["Authorization", "Bearer ••••••••"],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <span className="text-text-secondary">{k}</span>
                      <span className="text-text-muted truncate">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Send request (demo)"
                className="flex items-center gap-2 px-4 py-2 rounded-xs bg-brand-black text-brand-white text-xs font-mono hover:opacity-80 transition-opacity duration-[var(--dur-micro)] w-full justify-center"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M1 1l8 4-8 4V1z" fill="currentColor"/>
                </svg>
                Send Request
              </button>
            </div>

            {/* Response */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">Response</span>
                <span className="font-mono text-[10px] text-semantic-success">● 200 OK · 142ms</span>
              </div>

              <pre className="font-mono text-[10px] text-text-secondary leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`{
  "login": "octocat",
  "name": "The Octocat",
  "company": "@github",
  "public_repos": 8,
  "followers": 16908
}`}
              </pre>

              <div className="space-y-1.5">
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Response Headers</div>
                <div className="space-y-1">
                  {[
                    ["content-type", "application/json"],
                    ["x-ratelimit-limit", "60"],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <span className="text-text-secondary">{k}</span>
                      <span className="text-text-muted">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
