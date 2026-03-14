"use client";
import React from "react";
import style from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      router.replace("/login");
    }
  };
  return (
    <header className={style.header}>
      <Link className={style.logo} href="/shop">
        <h1 className={style.logoTitle}>NutriExplore</h1>
        <h2 className={style.logoText}>Food intelligence</h2>
      </Link>
      <nav className={style.navbar}>
        {/* <Link className={style.navButton} href="/cart">
          Cart
        </Link> */}
        {/* <Link
          className={`${style.navButton} text-red-500`}
          href="/shop/discover"
        >
          Discover
        </Link> */}
        {/* <Link className={style.navButton} href="/shop">
          Shop
        </Link> */}
        <Link onClick={handleLogout} className={style.navButton} href="/login">
          Logout
        </Link>
      </nav>
      {/* <button className={style.hamburger}>
        <Image
          src={"/icons/hamburger.svg"}
          alt="hambergur"
          width={24}
          height={24}
        />
      </button> */}
    </header>
  );
}
