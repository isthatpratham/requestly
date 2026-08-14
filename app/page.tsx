import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Divider } from "@/components/ui/Divider";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";
import { EmptyState } from "@/components/ui/EmptyState";

export default function Home() {
  return (
    <Container className="py-8 space-y-12">
      {/* Shell Header */}
      <PageHeading
        title="Requestly Foundation"
        description="Phase 1 — Project Foundation & Design System verification surface. Demonstrating global tokens, typography, layout, and UI primitives."
        badge={<Badge variant="operational">Phase 1 Complete</Badge>}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/explore">
              <Button variant="outline" size="sm">
                Explore Catalog (Stub)
              </Button>
            </Link>
            <Link href="/playground">
              <Button variant="primary" size="sm">
                Open Playground (Stub)
              </Button>
            </Link>
          </div>
        }
      />

      {/* System Status & Navigation Cards */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-tight text-text-secondary uppercase">
          Navigation Foundation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/explore" className="group">
            <div className="p-4 rounded-sm border border-border-default bg-background-elevated hover:border-border-strong transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted">/explore</span>
                <span className="text-xs font-medium text-text-primary group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary">Explore APIs</h3>
              <p className="text-xs text-text-secondary">
                Search, filter, and inspect public API catalog.
              </p>
            </div>
          </Link>

          <Link href="/playground" className="group">
            <div className="p-4 rounded-sm border border-border-default bg-background-elevated hover:border-border-strong transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted">/playground</span>
                <span className="text-xs font-medium text-text-primary group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary">Playground</h3>
              <p className="text-xs text-text-secondary">
                Test arbitrary requests and inspect live responses.
              </p>
            </div>
          </Link>

          <Link href="/collections" className="group">
            <div className="p-4 rounded-sm border border-border-default bg-background-elevated hover:border-border-strong transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted">/collections</span>
                <span className="text-xs font-medium text-text-primary group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary">Collections</h3>
              <p className="text-xs text-text-secondary">
                Browser-local API collection manager.
              </p>
            </div>
          </Link>

          <Link href="/history" className="group">
            <div className="p-4 rounded-sm border border-border-default bg-background-elevated hover:border-border-strong transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted">/history</span>
                <span className="text-xs font-medium text-text-primary group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
              <h3 className="text-sm font-semibold text-text-primary">Request History</h3>
              <p className="text-xs text-text-secondary">
                Local history of previously executed API requests.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <Divider />

      {/* UI Primitives Verification Surface */}
      <section className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-text-primary tracking-tight">
            Design System & Base UI Primitives
          </h2>
          <p className="text-xs text-text-secondary">
            Centralized tokens defined according to docs/DESIGN_SYSTEM.md
          </p>
        </div>

        {/* Buttons */}
        <div className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-3">
          <h3 className="text-xs font-semibold text-text-muted uppercase">Button Primitives</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm">
              Primary Button
            </Button>
            <Button variant="secondary" size="sm">
              Secondary Button
            </Button>
            <Button variant="outline" size="sm">
              Outline Button
            </Button>
            <Button variant="ghost" size="sm">
              Ghost Button
            </Button>
            <Button variant="destructive" size="sm">
              Destructive
            </Button>
            <Button variant="primary" size="sm" isLoading>
              Loading State
            </Button>
          </div>
        </div>

        {/* Badges & Status Indicators */}
        <div className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-3">
          <h3 className="text-xs font-semibold text-text-muted uppercase">
            Status Indicators & Badges
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="operational">Operational</Badge>
            <Badge variant="unavailable">Unavailable</Badge>
            <Badge variant="checking">Checking...</Badge>
            <Badge variant="warning">Rate Limited</Badge>
            <Badge variant="default">JSON</Badge>
            <Badge variant="outline">HTTPS</Badge>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-4">
          <h3 className="text-xs font-semibold text-text-muted uppercase">Form Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label required>API Target URL</Label>
              <Input placeholder="https://api.example.com/v1/health" />
            </div>

            <div>
              <Label>HTTP Method</Label>
              <Select
                options={[
                  { value: "GET", label: "GET" },
                  { value: "POST", label: "POST" },
                  { value: "PUT", label: "PUT" },
                  { value: "DELETE", label: "DELETE" },
                ]}
              />
            </div>

            <div>
              <Label>Authentication</Label>
              <Select
                options={[
                  { value: "none", label: "No Auth" },
                  { value: "apiKey", label: "API Key" },
                  { value: "bearer", label: "Bearer Token" },
                ]}
              />
            </div>
          </div>

          <div>
            <Label>JSON Payload</Label>
            <Textarea placeholder='{\n  "query": "search_term"\n}' rows={3} />
          </div>
        </div>

        {/* Skeletons & Loading Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-3">
            <h3 className="text-xs font-semibold text-text-muted uppercase">Loading State</h3>
            <LoadingIndicator text="Checking API Availability..." size="md" />
          </div>

          <div className="p-5 rounded-sm border border-border-default bg-background-elevated space-y-3">
            <h3 className="text-xs font-semibold text-text-muted uppercase">Empty State</h3>
            <EmptyState
              title="No collections created"
              description="Save APIs locally into collections to organize your workspace."
              action={
                <Button variant="outline" size="sm">
                  Create Collection
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </Container>
  );
}
