"use client";
import { useEffect, useState, useRef } from "react";
import style from "./CardContainer.module.css";
import { getProducts } from "@/lib/products";
import { useInView } from "react-intersection-observer";
import { useShopStore } from "@/store/shopStore";
import Card from "../Card/Card";

export default function CardContainer({ data }) {
  const { products, addProducts, page, setPage } = useShopStore();
  const [isLoading, setIsLoading] = useState(false);
  const lastFetchedPage = useRef(page);
  // const { ref, inView } = useInView();
  const { ref, inView } = useInView({ rootMargin: "14000px" });

  useEffect(() => {
    if (products.length === 0) {
      addProducts(data);
    }
  }, [data]);
  useEffect(() => {
    if (inView && !isLoading) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (page === 1 || page <= lastFetchedPage.current) return;
    if (isLoading) return;
    setIsLoading(true);
    console.log(page);

    const loadProducts = async () => {
      console.log("new products loading...");
      try {
        const newProducts = await getProducts(page);
        addProducts(newProducts);
        lastFetchedPage.current = page;
      } catch (error) {
        console.error("error loading new products from api", error);
      } finally {
        setIsLoading(false);
        console.log("Loaded!");
      }
    };
    loadProducts();
  }, [page]);
  return (
    <>
      <div className={style.cardContainer}>
        {products.map((el) => (
          <Card key={el.code} el={el} />
        ))}

        <div className={style.ghost}></div>
        <div className={style.ghost}></div>
        <div className={style.ghost}></div>
        <div className={style.ghost}></div>
      </div>
      <div ref={ref} className="w-full h-fit text-center">
        {isLoading ? "Loading more..." : "Scroll down to load more"}
      </div>
    </>
  );
}
