"use client";
import { useEffect, useRef } from "react";
import style from "./Search.module.css";
import cardStyle from "@/components/ui/CardContainer/CardContainer.module.css";
import ProductSearch from "@/components/ui/ProductSearch/ProductSearch";
import Card from "@/components/ui/Card/Card";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/products";
import { useInView } from "react-intersection-observer";
import { useShopStore } from "@/store/shopStore";
import { sortAndFilterProducts } from "@/lib/productUtils";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const {
    activeSort,
    activeCategory,
    searchQuery,
    searchResults,
    searchPage,
    searchHasMore,
    searchLoading,
    setSearchQuery,
    resetSearch,
    setSearchPage,
    setSearchHasMore,
    setSearchLoading,
    addSearchResults,
  } = useShopStore();

  const { ref, inView } = useInView({ rootMargin: "2000px" });

  const lastFetchedPage = useRef(searchPage);
  const lastFetchedQuery = useRef(searchQuery);

  // Sync state when query changes
  useEffect(() => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      resetSearch();
      lastFetchedPage.current = 0;
      lastFetchedQuery.current = query;
    }
  }, [query, searchQuery, resetSearch, setSearchQuery]);

  // Handle infinite scroll
  useEffect(() => {
    if (inView && !searchLoading && searchHasMore) {
      setSearchPage(searchPage + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, searchLoading, searchHasMore, setSearchPage]);

  // Fetch data
  useEffect(() => {
    if (!query) return;

    // Prevent fetching if Zustand state hasn't synced with the new query yet
    if (query !== searchQuery) return;

    // Prevent double fetches for the same page/query
    if (
      query === lastFetchedQuery.current &&
      searchPage <= lastFetchedPage.current
    ) {
      return;
    }

    const controller = new AbortController();

    const fetchSearchResults = async () => {
      setSearchLoading(true);
      try {
        const results = await searchProducts(query, searchPage, controller.signal);

        lastFetchedQuery.current = query;
        lastFetchedPage.current = searchPage;

        addSearchResults(results);
        setSearchHasMore(results.length > 0);
        setSearchLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setSearchLoading(false);
      }
    };

    fetchSearchResults();

    return () => {
      controller.abort();
    };
  }, [
    query,
    searchQuery,
    searchPage,
    addSearchResults,
    setSearchHasMore,
    setSearchLoading,
  ]);

  return (
    <div className={style.container}>
      <ProductSearch />

      {/* ── Results Logic ── */}
      {searchLoading && searchResults.length === 0 ? (
        <p className={style.noResults}>Searching...</p>
      ) : searchResults.length === 0 &&
        query === lastFetchedQuery.current &&
        lastFetchedPage.current > 0 ? (
        <p className={style.noResults}>
          {query
            ? "No products found. Try a different word!"
            : "Try searching for something!"}
        </p>
      ) : searchResults.length === 0 ? (
        <p className={style.noResults}>
          {!query ? "Try searching for something!" : "Searching..."}
        </p>
      ) : (
        <div className={cardStyle.cardContainer}>
          {sortAndFilterProducts(searchResults, activeSort, activeCategory).map(
            (el) => (
              <Card key={el.code} el={el} />
            ),
          )}
          <div className={cardStyle.ghost}></div>
          <div className={cardStyle.ghost}></div>
          <div className={cardStyle.ghost}></div>
          <div className={cardStyle.ghost}></div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div ref={ref} className="w-full h-fit text-center py-8">
          {searchLoading
            ? "Loading more..."
            : searchHasMore
              ? "Scroll down to load more"
              : "No more products"}
        </div>
      )}
    </div>
  );
}
