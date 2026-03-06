import React from "react";
import style from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={style.hero}>
      <div className={style.heroContent}>
        <h1 className={style.title}>
          Discover What's{" "}
          <em style={{ fontFamily: "Times New Roman" }}>Really</em> In Your Food
        </h1>
        <p className={style.subtitle}>
          Search millions of food products, understand ingredients, and make
          smarter nutrition choices.
        </p>
      </div>
      <div className={style.StatCard}>
        <div className={style.StatCardContentRight}>
          <h1 className={style.StatCardContentTitle}>3M+</h1>
          <p className={style.StatCardContentText}>Products</p>
        </div>
        <div className={style.StatCardContentCenter}>
          <h1 className={style.StatCardContentTitle}>100%</h1>
          <p className={style.StatCardContentText}>open data</p>
        </div>
        <div className={style.StatCardContentLeft}>
          <h1 className={style.StatCardContentTitle}>100%</h1>
          <p className={style.StatCardContentText}>open data</p>
        </div>
      </div>
    </section>
  );
}
