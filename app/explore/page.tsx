"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { PageHeading } from "@/components/ui/PageHeading";
import { Badge } from "@/components/ui/Badge";
import { ApiSearch } from "@/components/api/ApiSearch";
import { ApiFilters } from "@/components/api/ApiFilters";
import { ApiGrid } from "@/components/api/ApiGrid";
import { useApiSearch } from "@/hooks/useApiSearch";
import { MOCK_CATALOG_APIS } from "@/data/mockCatalog";

export default function ExplorePage() {
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
  } = useApiSearch(MOCK_CATALOG_APIS);

  return (
    <Container className="py-8 space-y-8">
      {/* Page Heading */}
      <PageHeading
        title="Public API Catalog Explorer"
        description="Search, filter, and inspect curated public APIs. Launch any API directly in the Playground or copy ready-to-use integration code."
        badge={
          <Badge variant="outline" size="sm" className="font-mono">
            CATALOG // {MOCK_CATALOG_APIS.length} ENTRIES
          </Badge>
        }
      />

      {/* Search and Filters Section */}
      <div className="p-6 rounded-sm border border-border-default bg-background-elevated space-y-6">
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

      {/* API Results Grid */}
      <ApiGrid
        apis={filteredApis}
        totalCount={MOCK_CATALOG_APIS.length}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={resetFilters}
      />
    </Container>
  );
}
