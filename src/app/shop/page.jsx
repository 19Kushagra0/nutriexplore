import React from "react";
import Shop from "./Shop/Shop";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer/Footer";
export default function page() {
  return (
    <div>
      <Header />
      <Shop />
      <Footer />
    </div>
  );
}
