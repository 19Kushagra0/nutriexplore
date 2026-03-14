import React from "react";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer/Footer";
import Search from "./Search/Search";

export default function page() {
  return (
    <div>
      <Header />
      <Search />
      <Footer />
    </div>
  );
}
