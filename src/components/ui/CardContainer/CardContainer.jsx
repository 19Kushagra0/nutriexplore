"use client";
import { useEffect, useState, useRef } from "react";
import style from "./CardContainer.module.css";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { useInView } from "react-intersection-observer";
import { useShopStore } from "@/store/shopStore";

export default function CardContainer({ data }) {
  const { products, addProducts, page, setPage } = useShopStore();
  const [isLoading, setIsLoading] = useState(false);
  const lastFetchedPage = useRef(page);
  // const [count, setCount] = useState(1);
  // Initialize state with the initial data.
  // This sets up the array so we can add more products to it later.
  // const [products, setProducts] = useState(data || []);
  const { ref, inView } = useInView();
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
        {products.map((el) => {
          return (
            <div key={el.code} className={style.card}>
              <div style={{ backgroundColor: "green" }} className={style.grade}>
                {el.nutriscore_grade?.toUpperCase()}
              </div>
              <div className={style.cardImage}>
                <Image
                  src={el.image_url || "/placeholder.png"}
                  alt={el.product_name || "product"}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="290px"
                />
              </div>
              <div className={style.cardDetail}>
                <div className={style.productType}>
                  {" "}
                  {el.categories?.split(",")[0]}
                </div>
                <div className={style.productName}>{el.product_name}</div>
                <div className={style.productCompany}>{el.brands}</div>
                <div className={style.nutrition}>
                  {" "}
                  {el.ingredients_text_en || el.ingredients_text}
                </div>
                <div className={style.nutritionCartContainer}>
                  <div className={style.nutritionBarContainer}>
                    <div className={style.nutritionBar}>
                      <div
                        style={{
                          backgroundColor: "#2d6a4f",
                          width: `${Math.round(10 - (((el.nutriscore_score || 0) + 15) / 55) * 9) * 10}%`,
                        }}
                        className={style.nutritionLevel}
                      ></div>
                    </div>
                    <div className={style.nutritionNumber}>
                      {Math.round(
                        10 - (((el.nutriscore_score || 0) + 15) / 55) * 9,
                      )}
                    </div>
                  </div>
                  <button className={style.CartButton}>+ Cart</button>
                </div>
              </div>
            </div>
          );
        })}

        <div className={style.ghost}></div>
        <div className={style.ghost}></div>
        <div className={style.ghost}></div>
        <div className={style.ghost}></div>
      </div>
      <div ref={ref} className="w-full h-[200px] text-center">
        {isLoading ? "Loading more..." : "Scroll down to load more"}
      </div>
    </>
  );
}
