import React from "react";
import style from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className={style.header}>
      <Link className={style.logo} href="/shop">
        <h1 className={style.logoTitle}>NutriExplore</h1>
        <h2 className={style.logoText}>Food intelligence</h2>
      </Link>
      <nav className={style.navbar}>
        <Link className={style.navButton} href="/shop/products">
          Products
        </Link>
        <Link
          className={`${style.navButton} text-red-500`}
          href="/shop/discover"
        >
          Discover
        </Link>
        <Link className={style.navButton} href="/about">
          About
        </Link>
        <Link className={style.navButton} href="/cart">
          Cart
        </Link>
      </nav>
      <button className={style.hamburger}>
        <Image
          src={"/icons/hamburger.svg"}
          alt="hambergur"
          width={24}
          height={24}
        />
      </button>
    </header>
  );
}
