import React from "react";
import style from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={style.footer}>
      <Link href="/shop" className={style.footerLogo}>
        NutriExplore
      </Link>
      <div className={style.footerDescription}>
        Data from OpenFoodFacts · Open Food Facts is a non-profit project
      </div>
    </div>
  );
}
