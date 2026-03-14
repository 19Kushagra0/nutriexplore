"use client";
import { useState, useEffect } from "react";
import style from "./Search.module.css";
import ProductSearch from "@/components/ui/ProductSearch/ProductSearch";
import Card from "@/components/ui/Card/Card";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/products";
import { useInView } from "react-intersection-observer";

// Placeholder: we will replace this with real search results later

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(query);
  // New states for infinite scroll
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ rootMargin: "2000px" });

  // 1. Reset everything when the search query changes!
  useEffect(() => {
    setProducts([]); // Clear the old search results (the apples)
    setPage(1); // Reset the infinite scroll back to page 1
  }, [query]);

  // 2. Your existing intersection observer
  useEffect(() => {
    if (inView && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading]);

  // 3. Your existing fetchSearchResults useEffect
  // ...

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        // Pass the current page down to your fetch function!
        const results = await searchProducts(query, page);

        if (page === 1) {
          // If it's the first page, replace the array
          setProducts(results);
        } else {
          // If it's page 2, 3, etc., add the new results to the existing ones
          setProducts((prev) => [...prev, ...results]);
        }
      } catch (error) {
        console.error("Failed to fetch search results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]); // Re-run when either the query OR the page changes

  return (
    <div className={style.container}>
      <ProductSearch />

      {/* ── Search results heading ── */}
      <p className={style.searchHeading}>Search Results</p>

      {/* ── Cards ── */}
      {products.length === 0 ? (
        <p className={style.noResults}>
          No products found. Try searching for something!
        </p>
      ) : (
        <div className={style.cardContainer}>
          {products.map((el) => (
            <Card key={el.code} el={el} />
          ))}
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
