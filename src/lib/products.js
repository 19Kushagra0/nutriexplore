export async function getProducts(page = 1) {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/search?page=${page}&page_size=25`,
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
// src/lib/products.js
export async function searchProducts(query, page = 1, signal) {
  try {
    // Note the URL change here to use search_terms!
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page=${page}&page_size=25`,
      {
        headers: {
          "User-Agent": "NutriExploreApp/1.0 (NutriExplore@example.com)",
        },
        signal: signal,
      },
    );

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      console.error("API returned HTML instead of JSON.");
      return [];
    }

    if (!res.ok) {
      console.error("API Error Status:", res.status);
      return [];
    }

    const data = await res.json();
    return data.products || [];
  } catch (error) {
    if (error.name === "AbortError") {
      throw error; // <-- ADD THIS
    }
    // Return empty array silently to show "No products found", avoiding Next.js red error overlay
    return [];
  }
}

export async function getProductByBarcode(code) {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${code}`,
      {
        headers: {
          "User-Agent": "NutriExploreApp/1.0 (NutriExplore@example.com)",
        },
      },
    );

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      console.error("API returned HTML instead of JSON. Status:", res.status);
      return null;
    }

    if (!res.ok) {
      console.error("API Error Status:", res.status);
      return null;
    }

    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error("Fetch error in getProductByBarcode:", error);
    return null;
  }
}
