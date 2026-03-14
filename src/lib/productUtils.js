export function sortAndFilterProducts(products, sort, category) {
  let filtered = [...products];

  if (category !== "") {
    filtered = filtered.filter((product) => {
      const productCategories = product.categories || "";
      return productCategories.toLowerCase().includes(category.toLowerCase());
    });
  }
  let displayedProducts = [...filtered];

  if (!sort && !category) {
    return displayedProducts;
  }

  // 3. Sort the products
  if (sort === "name_asc") {
    // A to Z
    displayedProducts.sort((a, b) => {
      const nameA = a.product_name || "z";
      const nameB = b.product_name || "z";
      return nameA.localeCompare(nameB);
    });
  } else if (sort === "name_desc") {
    // Z to A
    displayedProducts.sort((a, b) => {
      const nameA = a.product_name || "a";
      const nameB = b.product_name || "a";
      return nameB.localeCompare(nameA);
    });
  } else if (sort === "grade_asc") {
    // Nutrition Grade A to E
    displayedProducts.sort((a, b) => {
      const gradeA = a.nutrition_grades || "z"; // Default to z if missing so it goes to bottom
      const gradeB = b.nutrition_grades || "z";
      return gradeA.localeCompare(gradeB);
    });
  } else if (sort === "grade_desc") {
    // Nutrition Grade E to A
    displayedProducts.sort((a, b) => {
      const gradeA = a.nutrition_grades || "a"; // Default to a if missing so it goes to bottom
      const gradeB = b.nutrition_grades || "a";
      return gradeB.localeCompare(gradeA);
    });
  }

  return displayedProducts;
}
