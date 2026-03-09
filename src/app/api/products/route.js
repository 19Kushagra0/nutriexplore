import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://world.openfoodfacts.org/cgi/search.pl?search_terms=bread&json=1&page=1&page_size=20",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    },
  );
  const data = await res.json();
  console.log(data);

  return NextResponse.json({ products: data });
}
