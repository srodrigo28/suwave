import {
  getRecommendedSearchResults,
  getSearchCategories,
  getSearchSuggestions,
} from "@/repositories/search-repository";
import { SearchScreen } from "./_components/search-screen";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;

  return (
    <SearchScreen
      categories={getSearchCategories()}
      initialResults={getRecommendedSearchResults()}
      initialImageMode={params.mode === "image"}
      suggestions={getSearchSuggestions()}
    />
  );
}
