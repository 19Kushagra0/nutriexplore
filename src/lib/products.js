"use server";

export async function getProducts(page = 1) {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/search?page=${page}&page_size=75`,
      {
        headers: {
          "User-Agent": "NutriExploreApp/1.0 (NutriExplore@example.com)",
        },
        next: { revalidate: 3600 },
      },
    );

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      console.error("API returned HTML instead of JSON. Status:", res.status);
      return [];
    }

    if (!res.ok) {
      console.error("API Error Status:", res.status);
      return [];
    }

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Fetch error in getProducts:", error);
    return [];
  }
}
