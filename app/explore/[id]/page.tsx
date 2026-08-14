import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function ApiDetailPage({ params }: { params: { id: string } }) {
  return (
    <Container className="py-8 space-y-6">
      <PageHeading
        title={`API Detail (${params.id})`}
        description="Detailed metadata, authentication requirements, and live availability check."
        badge={<Badge variant="outline">Route Stub — Phase 3 Scope</Badge>}
      />
      <EmptyState
        title="API Detail Page Coming in Phase 3"
        description="Detailed metadata and live health checks for API endpoints will be implemented in Phase 3."
        action={
          <Button variant="secondary" size="sm" onClick={undefined}>
            Phase 1 Foundation Ready
          </Button>
        }
      />
    </Container>
  );
}
