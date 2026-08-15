"use client";

import * as React from "react";
import { ApiSearch } from "@/components/api/ApiSearch";
import { ApiFilters } from "@/components/api/ApiFilters";
import { ApiGrid } from "@/components/api/ApiGrid";
import { useApiSearch } from "@/hooks/useApiSearch";
import { MOCK_CATALOG_APIS } from "@/data/mockCatalog";
import { ApiItem } from "@/types/api";

export default function ExplorePage() {
  const [catalogApis, setCatalogApis] = React.useState<ApiItem[]>(MOCK_CATALOG_APIS);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    fetch("/api/apis?limit=100")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.items) && data.data.items.length > 0) {
          setCatalogApis(data.data.items);
        } else if (data.success && Array.isArray(data.data?.apis) && data.data.apis.length > 0) {
          setCatalogApis(data.data.apis);
        }
      })
      .catch((err) => {
        console.error("Failed to load catalog from /api/apis:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    auth,
    setAuth,
    https,
    setHttps,
    cors,
    setCors,
    filteredApis,
    hasActiveFilters,
    resetFilters,
  } = useApiSearch(catalogApis);

  return (
    <div className="min-h-screen" style={{ paddingTop: "72px" }}>
      {/* Page header */}
      <div className="border-b border-border-default bg-background-secondary">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
          <div className="mb-2">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
              Public API Catalog
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-brand-black tracking-tight mb-3">
            Explore APIs
          </h1>
          <p className="text-sm text-text-secondary max-w-md leading-relaxed">
            {isLoading
              ? "Loading catalog…"
              : `${catalogApis.length.toLocaleString()} curated public APIs. Search, filter, and launch in the Playground.`}
          </p>
        </div>
      </div>

      {/* Search + Filters bar */}
      <div className="border-b border-border-default bg-background-elevated">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 space-y-3">
          <ApiSearch value={searchQuery} onChange={setSearchQuery} />
          <ApiFilters
            category={category}
            onCategoryChange={setCategory}
            auth={auth}
            onAuthChange={setAuth}
            https={https}
            onHttpsChange={setHttps}
            cors={cors}
            onCorsChange={setCors}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
          />
        </div>
      </div>

      {/* Repository browser result list */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
        <ApiGrid
          apis={filteredApis}
          totalCount={catalogApis.length}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
        />
      </div>
    </div>
  );
}
