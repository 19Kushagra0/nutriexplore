"use client";
import { useState } from "react";
import { useEffect } from "react";
import style from "./Shop.module.css";
import Hero from "@/components/ui/Hero/Hero";
import ProductSearch from "@/components/ui/ProductSearch/ProductSearch";
import CardContainer from "@/components/ui/CardContainer/CardContainer";

export default function Shop() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      setProducts(data.products.products);
    };
    getProducts();
  }, []);

  return (
    <div className={style.container}>
      <Hero />
      <ProductSearch />
      <CardContainer products={products} />
    </div>
  );
}
