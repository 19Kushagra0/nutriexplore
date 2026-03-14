import React, { Suspense } from "react";
import Header from "@/components/ui/Header/Header";
import Footer from "@/components/ui/Footer/Footer";
import Search from "./Search/Search";

export default function page() {
  return (
    <div>
      <Header />
      {/* 
        Wrap the Search component in Suspense so Next.js knows 
        to wait for the client-side URL before rendering it.
      */}
      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "50px" }}>
            Loading search...
          </div>
        }
      >
        <Search />
      </Suspense>
      <Footer />
    </div>
  );
}
