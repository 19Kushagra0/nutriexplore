import React from "react";
import style from "./ProductSearch.module.css";
import Image from "next/image";
export default function ProductSearch() {
  return (
    <section className={style.ProductSearch}>
      <div className={style.searchFilterContainer}>
        <div className={style.searchContainer}>
          <Image
            width={25}
            height={25}
            alt="searchIcon"
            src={"/icons/search.svg"}
          />
          <div></div>
          <input type="text" className={style.searchContainerInput} />
        </div>
        <button className={style.filterButton}>
          <Image
            width={25}
            height={25}
            alt="filterIcon"
            src={"/icons/filter.svg"}
          />
        </button>
      </div>
      <div className={style.optionsContainer}></div>
    </section>
  );
}
