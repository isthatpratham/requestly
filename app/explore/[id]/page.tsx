import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ApiDetails } from "@/components/api/ApiDetails";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { getApiById } from "@/lib/catalog";
import { MOCK_CATALOG_APIS } from "@/data/mockCatalog";

export default async function ApiDetailPage({ params }: { params: { id: string } }) {
  let result = null;

  try {
    result = await getApiById(params.id);
  } catch (err) {
    console.error(`Error loading API catalog entry ${params.id}:`, err);
  }

  // Fallback to mock catalog item if not found in database by ObjectId
  const api = result?.api ?? MOCK_CATALOG_APIS.find((item) => item.id === params.id);
  const initialHealth = result?.latestHealthCheck ?? undefined;

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
      <ApiDetails api={api} initialHealth={initialHealth ?? undefined} />
    </Container>
  );
}
