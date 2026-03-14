"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "../CardContainer/CardContainer.module.css";

const FALLBACK_IMG =
  "https://blocks.astratic.com/img/general-img-landscape.png";

const nutriColors = {
  a: "#2d6a4f",
  b: "#52b788",
  c: "#f4a261",
  d: "#e76f51",
  e: "#d00000",
};

export default function Card({ el }) {
  const [imgSrc, setImgSrc] = useState(
    el.image_front_url && el.image_front_url.trim() !== ""
      ? el.image_front_url
      : FALLBACK_IMG,
  );

  return (
    <Link
      href={`/product/${el.code}`}
      className={style.card}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="">
        {el.nutriscore_grade && (
          <div
            style={{
              backgroundColor:
                nutriColors[el.nutriscore_grade.toLowerCase()] || "#000000",
            }}
            className={style.grade}
          >
            {el.nutriscore_grade.toUpperCase()}
          </div>
        )}
        <div className={style.cardImage}>
          <Image
            src={imgSrc}
            alt={el.product_name || "product"}
            fill
            style={{ objectFit: "cover" }}
            sizes="290px"
            onError={() => setImgSrc(FALLBACK_IMG)}
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
            {(el.ingredients_text_en || el.ingredients_text || "").length > 80
              ? (el.ingredients_text_en || el.ingredients_text).slice(0, 80) +
                "..."
              : el.ingredients_text_en || el.ingredients_text}
          </div>
        </div>
      </div>
      <div className={style.nutritionCartContainer}>
        <div className={style.nutritionBarContainer}>
          <div className={style.nutritionBar}>
            <div
              style={{
                backgroundColor:
                  nutriColors[el.nutriscore_grade?.toLowerCase()] || "#000000",
                width: `${Math.round(10 - (((el.nutriscore_score || 0) + 15) / 55) * 9) * 10}%`,
              }}
              className={style.nutritionLevel}
            ></div>
          </div>
          <div className={style.nutritionNumber}>
            {Math.round(10 - (((el.nutriscore_score || 0) + 15) / 55) * 9)}
          </div>
        </div>
        {/* <button className={style.CartButton}>+ Cart</button> */}
      </div>
    </Link>
  );
}
