"use client";
import { useState, useEffect } from "react";
import style from "./Search.module.css";
import ProductSearch from "@/components/ui/ProductSearch/ProductSearch";
import Card from "@/components/ui/Card/Card";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/products";
import { useInView } from "react-intersection-observer";
import { useShopStore } from "@/store/shopStore";
import { sortAndFilterProducts } from "@/lib/productUtils";

// Placeholder: we will replace this with real search results later

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { activeSort, activeCategory } = useShopStore();
  const [hasMore, setHasMore] = useState(false); // guard for infinite scroll
  // New states for infinite scroll
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ rootMargin: "2000px" });

  // 1. Reset everything when the search query changes!
  useEffect(() => {
    setProducts([]); // Clear the old search results
    setPage(1); // Reset the infinite scroll back to page 1
    setHasMore(false); // Disable scroll trigger until page 1 loads
  }, [query]);

  // 2. Intersection observer — only advance the page when hasMore is ready
  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading, hasMore]);

  // 3. Your existing fetchSearchResults useEffect
  // ...

  useEffect(() => {
    // 1. Create the controller right inside the useEffect
    const controller = new AbortController();

    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        // 2. Pass the controller's signal to our search API
        const results = await searchProducts(query, page, controller.signal);

        if (page === 1) {
          setProducts(results);
        } else {
          setProducts((prev) => [...prev, ...results]);
        }
        setHasMore(results.length > 0); // enable scroll only when there are results
        setLoading(false);
      } catch (error) {
        // 3. IMPORTANT: If the fetch is cancelled, do nothing — not even setLoading(false)!
        // `finally` would have run setLoading(false) even on AbortError, causing a flash
        // of "No products found" before the new request's results arrive.
        if (error.name === "AbortError") {
          return;
        }
        // Real error: stop loading so the empty state is shown
        setLoading(false);
      }
    };

    fetchSearchResults();

    // 4. Cleanup function: Abort the previous fetch if you type a new letter
    return () => {
      controller.abort();
    };
  }, [query, page]);

  return (
    <div className={style.container}>
      <ProductSearch />

      {/* ── Results Logic ── */}
      {loading && products.length === 0 ? (
        <p className={style.noResults}>Searching...</p>
      ) : products.length === 0 ? (
        <p className={style.noResults}>
          {query
            ? "No products found. Try a different word!"
            : "Try searching for something!"}
        </p>
      ) : (
        <div className={style.cardContainer}>
          {sortAndFilterProducts(products, activeSort, activeCategory).map(
            (el) => (
              <Card key={el.code} el={el} />
            ),
          )}
        </div>
      )}

      {products.length > 0 && (
        <div ref={ref} className="w-full h-fit text-center py-8">
          {loading ? "Loading more..." : "Scroll down to load more"}
        </div>
      )}
    </div>
  );
}
