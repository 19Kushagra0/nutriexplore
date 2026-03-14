import React from "react";
import Product from "./Product/Product";
import Header from "@/components/ui/Header/Header";

export default async function page({ params }) {
  const { id } = await params;
  return (
    <div>
      <Header />
      <Product id={id} />
    </div>
  );
}
