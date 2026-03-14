"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShopStore } from "@/store/shopStore";
import { getProductByBarcode } from "@/lib/products";
import style from "./Product.module.css";

const FALLBACK_IMG =
  "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.42.400.jpg";

const nutriColors = {
  a: "#2d6a4f",
  b: "#52b788",
  c: "#f4a261",
  d: "#e76f51",
  e: "#d00000",
};

const nutriLabels = {
  a: "Excellent",
  b: "Good",
  c: "Fair",
  d: "Poor",
  e: "Bad",
};

export default function Product({ id }) {
  const router = useRouter();
  const { products } = useShopStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(FALLBACK_IMG);

  useEffect(() => {
    if (!id) return;

    // First try to find in Zustand store
    const found = products.find((p) => p.code === id);
    if (found) {
      setProduct(found);
      setImgSrc(
        found.image_front_url && found.image_front_url.trim() !== ""
          ? found.image_front_url
          : FALLBACK_IMG,
      );
      setLoading(false);
      return;
    }

    // Fall back to API fetch
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductByBarcode(id);
      if (data) {
        setProduct(data);
        setImgSrc(
          data.image_front_url && data.image_front_url.trim() !== ""
            ? data.image_front_url
            : FALLBACK_IMG,
        );
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, products]);

  const grade = product?.nutriscore_grade?.toLowerCase();
  const gradeColor = nutriColors[grade] || "#9a8674";
  const gradeLabel = nutriLabels[grade] || "Unknown";

  const nutritionScore = Math.round(
    10 - (((product?.nutriscore_score || 0) + 15) / 55) * 9,
  );

  const categories =
    product?.categories?.split(",").map((c) => c.trim()) || [];

  // ── Loading state ──
  if (loading) {
    return (
      <div className={style.container}>
        <button className={style.backButton} onClick={() => router.back()}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <div className={style.loadingState}>
          <div className={style.loadingBar} />
          <div className={style.loadingBar} style={{ width: "60%" }} />
          <div className={style.loadingBar} style={{ width: "40%" }} />
        </div>
      </div>
    );
  }

  // ── Not found state ──
  if (!product) {
    return (
      <div className={style.container}>
        <button className={style.backButton} onClick={() => router.back()}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <div className={style.notFound}>Product not found.</div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      {/* Back button */}
      <button className={style.backButton} onClick={() => router.back()}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      <div className={style.productLayout}>
        {/* Left: Image panel */}
        <div className={style.imagePanel}>
          <div className={style.imageWrapper}>
            {grade && (
              <div
                className={style.gradeBadge}
                style={{ backgroundColor: gradeColor }}
              >
                {grade.toUpperCase()}
              </div>
            )}
            <Image
              src={imgSrc}
              alt={product.product_name || "product"}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 480px"
              onError={() => setImgSrc(FALLBACK_IMG)}
              priority
            />
          </div>

          {/* Nutri-score card */}
          <div className={style.nutriCard}>
            <div className={style.nutriCardHeader}>Nutri-Score</div>
            <div className={style.nutriLetters}>
              {["a", "b", "c", "d", "e"].map((l) => (
                <div
                  key={l}
                  className={style.nutriLetter}
                  style={{
                    backgroundColor:
                      l === grade ? nutriColors[l] : "transparent",
                    color: l === grade ? "#fff" : "#b8a898",
                    border: `2px solid ${l === grade ? nutriColors[l] : "#e8e0d5"}`,
                    transform: l === grade ? "scale(1.25)" : "scale(1)",
                  }}
                >
                  {l.toUpperCase()}
                </div>
              ))}
            </div>
            <div className={style.nutriScoreRow}>
              <div className={style.nutriBar}>
                <div
                  className={style.nutriBarFill}
                  style={{
                    width: `${nutritionScore * 10}%`,
                    backgroundColor: gradeColor,
                  }}
                />
              </div>
              <span className={style.nutriScoreNumber}>{nutritionScore}/10</span>
            </div>
            <div className={style.nutriLabel} style={{ color: gradeColor }}>
              {gradeLabel}
            </div>
          </div>
        </div>

        {/* Right: Details panel */}
        <div className={style.detailsPanel}>
          {categories[0] && (
            <div className={style.categoryTag}>{categories[0]}</div>
          )}

          <h1 className={style.productName}>{product.product_name}</h1>

          {product.brands && (
            <div className={style.brandRow}>
              <span className={style.brandLabel}>By</span>
              <span className={style.brandName}>{product.brands}</span>
            </div>
          )}

          {product.quantity && (
            <div className={style.quantityTag}>{product.quantity}</div>
          )}

          <div className={style.divider} />

          {/* Nutrition facts */}
          <div className={style.sectionTitle}>Nutrition Facts</div>
          <div className={style.nutritionGrid}>
            {[
              {
                label: "Energy",
                value: product.nutriments?.["energy-kcal_100g"],
                unit: "kcal",
              },
              {
                label: "Protein",
                value: product.nutriments?.proteins_100g,
                unit: "g",
              },
              {
                label: "Carbs",
                value: product.nutriments?.carbohydrates_100g,
                unit: "g",
              },
              {
                label: "Fat",
                value: product.nutriments?.fat_100g,
                unit: "g",
              },
              {
                label: "Fiber",
                value: product.nutriments?.fiber_100g,
                unit: "g",
              },
              {
                label: "Sugars",
                value: product.nutriments?.sugars_100g,
                unit: "g",
              },
              {
                label: "Salt",
                value: product.nutriments?.salt_100g,
                unit: "g",
              },
            ]
              .filter((n) => n.value !== undefined && n.value !== null)
              .map((n) => (
                <div key={n.label} className={style.nutritionItem}>
                  <span className={style.nutritionLabel}>{n.label}</span>
                  <span className={style.nutritionValue}>
                    {Math.round(n.value * 100) / 100}
                    <span className={style.nutritionUnit}>{n.unit}</span>
                  </span>
                </div>
              ))}
          </div>

          {product.serving_size && (
            <div className={style.servingNote}>
              Per 100g · Serving size: {product.serving_size}
            </div>
          )}

          <div className={style.divider} />

          {/* Ingredients */}
          {(product.ingredients_text_en || product.ingredients_text) && (
            <div className={style.infoSection}>
              <div className={style.sectionTitle}>Ingredients</div>
              <p className={style.ingredientsText}>
                {product.ingredients_text_en || product.ingredients_text}
              </p>
            </div>
          )}

          {/* Additional info */}
          <div className={style.infoGrid}>
            {[
              { label: "Packaging", value: product.packaging },
              { label: "Labels", value: product.labels },
              { label: "Countries", value: product.countries },
              { label: "Stores", value: product.stores },
            ]
              .filter((i) => i.value)
              .map((i) => (
                <div key={i.label} className={style.infoItem}>
                  <span className={style.infoLabel}>{i.label}</span>
                  <span className={style.infoValue}>{i.value}</span>
                </div>
              ))}
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className={style.infoSection}>
              <div className={style.sectionTitle}>Categories</div>
              <div className={style.categoryPills}>
                {categories.map((cat, i) => (
                  <span key={i} className={style.categoryPill}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
