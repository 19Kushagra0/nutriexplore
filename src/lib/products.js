export async function getProducts() {
  const res = await fetch(
    "https://world.openfoodfacts.org/cgi/search.pl?search_terms=milk&json=1&page=1&page_size=20",
    {
      next: { revalidate: 3600 },
    },
  );

  const data = await res.json();
  return data.products;
}
