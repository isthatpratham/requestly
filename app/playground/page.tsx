import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function PlaygroundPage() {
  return (
    <Container className="py-8 space-y-6">
      <PageHeading
        title="API Playground"
        description="Interactive API request builder, execution engine, and response inspector."
        badge={<Badge variant="outline">Route Stub — Phase 4 Scope</Badge>}
      />
      <EmptyState
        title="Playground Coming in Phase 4"
        description="The interactive HTTP request builder, execution engine, and response viewer will be implemented in Phase 4."
        action={
          <Button variant="secondary" size="sm" onClick={undefined}>
            Phase 1 Foundation Ready
          </Button>
        }
      />
    </Container>
  );
}
