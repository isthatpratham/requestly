import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function HistoryPage() {
  return (
    <Container className="py-8 space-y-6">
      <PageHeading
        title="Request History"
        description="Review recent requests executed through the Playground."
        badge={<Badge variant="outline">Route Stub — Phase 6 Scope</Badge>}
      />
      <EmptyState
        title="Request History Coming in Phase 6"
        description="Browser-local request history tracking will be implemented in Phase 6."
        action={
          <Button variant="secondary" size="sm" onClick={undefined}>
            Phase 1 Foundation Ready
          </Button>
        }
      />
    </Container>
  );
}
