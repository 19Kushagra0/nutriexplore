"use client";
import React, { useState } from "react";
import style from "./ProductSearch.module.css";
import Image from "next/image";
import { useShopStore } from "@/store/shopStore";

export default function ProductSearch() {
  const { setFilters } = useShopStore();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const appyButton = () => {
    setFilters(sortValue, categoryValue);
  };
  const resetButton = () => {
    setSortValue("");
    setCategoryValue("");
    setFilters("", "");
  };
  return (
    <section className={style.ProductSearch}>
      {/* ── Top bar: search input + filter button ── */}
      <div className={style.searchFilterContainer}>
        <div className={style.searchContainer}>
          <Image
            width={20}
            height={20}
            alt="searchIcon"
            src={"/icons/search.svg"}
          />
          <div className={style.divider}></div>
          <input
            type="text"
            placeholder="Search products…"
            className={style.searchContainerInput}
          />
          {/* Search submit button */}
          <button className={style.searchButton}>Search</button>
        </div>

        {/* Filter toggle button */}
        <button
          className={`${style.filterButton} ${filterOpen ? style.filterButtonActive : ""}`}
          onClick={() => setFilterOpen((prev) => !prev)}
          aria-expanded={filterOpen}
          aria-label="Toggle filters"
        >
          <Image
            width={20}
            height={20}
            alt="filterIcon"
            src={"/icons/filter.svg"}
          />
        </button>
      </div>

      {/* ── Collapsible filter / sort panel ── */}
      <div
        className={`${style.optionsContainer} ${filterOpen ? style.optionsContainerOpen : ""}`}
      >
        <div className={style.optionsInner}>
          {/* Sort section */}
          <div className={style.filterGroup}>
            <label className={style.filterLabel}>
              <Image width={16} height={16} alt="" src={"/icons/filter.svg"} />
              Sort by
            </label>
            <select
              className={style.filterSelect}
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
            >
              <option value="">— None —</option>
              <option value="name_asc">Name (A → Z)</option>
              <option value="name_desc">Name (Z → A)</option>
              <option value="grade_asc">Nutrition Grade (Best first)</option>
              <option value="grade_desc">Nutrition Grade (Worst first)</option>
            </select>
          </div>

          {/* Vertical divider */}
          <div className={style.groupDivider}></div>

          {/* Category section */}
          <div className={style.filterGroup}>
            <label className={style.filterLabel}>
              <Image width={16} height={16} alt="" src={"/icons/filter.svg"} />
              Category
            </label>
            <select
              className={style.filterSelect}
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="beverages">Beverages</option>
              <option value="dairy">Dairy</option>
              <option value="snacks">Snacks</option>
              <option value="fruits-and-vegetables">
                Fruits &amp; Vegetables
              </option>
              <option value="cereals-and-potatoes">
                Cereals &amp; Potatoes
              </option>
              <option value="fish-meat-eggs">Fish, Meat &amp; Eggs</option>
              <option value="fat-and-sauces">Fats &amp; Sauces</option>
              <option value="sugary-snacks">Sugary Snacks</option>
            </select>
          </div>

          {/* Apply / Reset buttons */}
          <div className={style.filterActions}>
            <button onClick={appyButton} className={style.applyButton}>
              Apply
            </button>
            <button onClick={resetButton} className={style.resetButton}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
