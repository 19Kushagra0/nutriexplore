"use client";
import { useState, useEffect } from "react";
import style from "./CardContainer.module.css";
import Image from "next/image";

export default function CardContainer({ products }) {
  console.log(products);
  return (
    <div className={style.cardContainer}>
      {products.map((el, index) => {
        return (
          <div key={index} className={style.card}>
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
  );
}
