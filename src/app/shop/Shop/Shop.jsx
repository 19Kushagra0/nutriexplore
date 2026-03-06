import React from "react";
import style from "./Shop.module.css";
import Hero from "@/components/ui/Hero/Hero";
import ProductSearch from "@/components/ui/ProductSearch/ProductSearch";
import CardContainer from "@/components/ui/CardContainer/CardContainer";

export default function Shop() {
  return (
    <div className={style.container}>
      <Hero />
      <ProductSearch />
      <CardContainer />
    </div>
  );
}
