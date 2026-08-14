import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ApiDetails } from "@/components/api/ApiDetails";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { MOCK_CATALOG_APIS } from "@/data/mockCatalog";

export default function ApiDetailPage({ params }: { params: { id: string } }) {
  const api = MOCK_CATALOG_APIS.find((item) => item.id === params.id);

  if (!api) {
    return (
      <Container className="py-12 space-y-6">
        <EmptyState
          title={`API Not Found: "${params.id}"`}
          description="The requested API identifier does not exist in the Requestly public catalog."
          action={
            <Link href="/explore">
              <Button variant="primary" size="sm">
                ← Back to Catalog Explorer
              </Button>
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <ApiDetails api={api} />
    </Container>
  );
}
