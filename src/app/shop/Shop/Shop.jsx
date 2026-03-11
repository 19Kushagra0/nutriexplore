import style from "./Shop.module.css";
import Hero from "@/components/ui/Hero/Hero";
import ProductSearch from "@/components/ui/ProductSearch/ProductSearch";
import CardContainer from "@/components/ui/CardContainer/CardContainer";
import { getProducts } from "@/lib/products";

export default async function Shop() {
  const data = await getProducts();
  return (
    <div className={style.container}>
      <Hero />
      <ProductSearch />
      <CardContainer data={data} />
    </div>
  );
}
