import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function ExplorePage() {
  return (
    <Container className="py-8 space-y-6">
      <PageHeading
        title="Explore APIs"
        description="Search, filter, and inspect the public API catalog."
        badge={<Badge variant="outline">Route Stub — Phase 2 Scope</Badge>}
      />
      <EmptyState
        title="Explore Catalog Coming in Phase 2"
        description="The API catalog search and filter interface will be connected to MongoDB in Phase 2."
        action={
          <Button variant="secondary" size="sm" onClick={undefined}>
            Phase 1 Foundation Ready
          </Button>
        }
      />
    </Container>
  );
}
