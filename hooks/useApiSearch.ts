import { useState, useMemo } from "react";
import { ApiItem } from "@/types/api";

export interface ApiFilterOptions {
  searchQuery: string;
  category: string;
  auth: string;
  https: string;
  cors: string;
}

export function useApiSearch(initialApis: ApiItem[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [auth, setAuth] = useState("all");
  const [https, setHttps] = useState("all");
  const [cors, setCors] = useState("all");

  const filteredApis = useMemo(() => {
    return initialApis.filter((api) => {
      // 1. Text Search (name, description, category, url)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = api.name.toLowerCase().includes(query);
        const matchesDesc = api.description.toLowerCase().includes(query);
        const matchesCat = api.category.toLowerCase().includes(query);
        const matchesUrl = api.url.toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesCat && !matchesUrl) {
          return false;
        }
      }

      // 2. Category Filter
      if (category !== "All" && api.category !== category) {
        return false;
      }

      // 3. Auth Filter
      if (auth !== "all") {
        if (auth === "none" && api.auth !== null) return false;
        if (auth === "apiKey" && api.auth?.toLowerCase() !== "apikey") return false;
        if (auth === "oauth" && api.auth?.toLowerCase() !== "oauth") return false;
        if (auth === "bearer" && !api.auth?.toLowerCase().includes("bearer")) return false;
      }

      // 4. HTTPS Filter
      if (https !== "all") {
        const isHttps = https === "true";
        if (api.https !== isHttps) return false;
      }

      // 5. CORS Filter
      if (cors !== "all") {
        if (cors === "yes" && api.cors !== "yes") return false;
        if (cors === "no" && api.cors !== "no") return false;
      }

      return true;
    });
  }, [initialApis, searchQuery, category, auth, https, cors]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    category !== "All" ||
    auth !== "all" ||
    https !== "all" ||
    cors !== "all";

  const activeFilterCount =
    (searchQuery.trim() ? 1 : 0) +
    (category !== "All" ? 1 : 0) +
    (auth !== "all" ? 1 : 0) +
    (https !== "all" ? 1 : 0) +
    (cors !== "all" ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery("");
    setCategory("All");
    setAuth("all");
    setHttps("all");
    setCors("all");
  };

  return {
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
    activeFilterCount,
    resetFilters,
  };
}
