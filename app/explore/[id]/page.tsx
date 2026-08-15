import Link from "next/link";
import { ApiDetails } from "@/components/api/ApiDetails";
import { getApiById } from "@/lib/catalog";
import { MOCK_CATALOG_APIS } from "@/data/mockCatalog";

export default async function ApiDetailPage({ params }: { params: { id: string } }) {
  let result = null;

  try {
    result = await getApiById(params.id);
  } catch (err) {
    console.error(`Error loading API catalog entry ${params.id}:`, err);
  }

  const api = result?.api ?? MOCK_CATALOG_APIS.find((item) => item.id === params.id);
  const initialHealth = result?.latestHealthCheck ?? undefined;

  if (!api) {
    return (
      <div className="min-h-screen" style={{ paddingTop: "72px" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 text-center">
          <p className="font-mono text-[10px] tracking-widest text-text-muted uppercase mb-4">404 Not Found</p>
          <h1 className="font-display text-3xl font-medium text-brand-black mb-4">API not found</h1>
          <p className="text-sm text-text-secondary mb-8">
            The requested API identifier does not exist in the catalog.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xs border border-border-default text-sm font-medium text-text-primary hover:bg-background-secondary transition-colors duration-[80ms]"
          >
            ← Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: "72px" }}>
      <ApiDetails api={api} initialHealth={initialHealth ?? undefined} />
    </div>
  );
}
