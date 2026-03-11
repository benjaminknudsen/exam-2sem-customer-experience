import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetailPage({
  addToCart,
  favoriteIds,
  toggleFavorite,
}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(`${import.meta.env.BASE_URL}products.json`);
      const data = await res.json();
      const found = data.find((p) => String(p.id) === id);
      setProduct(found);
      setSelectedSize("");
    }
    load();
  }, [id]);

  function handleAddToBag() {
    addToCart(product);
    setSelectedSize("");
  }

  if (!product) {
    return <p>Loading…</p>;
  }

  if (product === undefined) {
    return <p>Product not found.</p>;
  }

  const isFavorite = favoriteIds.has(product.id);

  return (
    <main>
      <section className="product-detail">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <p className="product-brand">{product.brand}</p>
          <h2 className="product-title-detail">{product.title}</h2>

          <div className="product-pricing detail-pricing">
            {product.beforeprice ? (
              <p className="before-price-detail">{product.beforeprice} kr.</p>
            ) : null}
            <p className="product-price">{product.price} kr.</p>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-options">
            <div className="option-group color-group">
              <span>Product Color</span>
              <span
                className="color-circle"
                style={{ background: product.color.toLowerCase() }}
              ></span>
            </div>
            <div className="option-group sizes">
              <span>Product Size</span>
              <div className="size-buttons">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-btn ${selectedSize === size ? "size-btn-active" : ""}`}
                    aria-pressed={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product-actions">
            <button
              type="button"
              className="add-to-bag"
              onClick={handleAddToBag}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Bag" : "Out of stock"}
            </button>
            <button
              type="button"
              className="product-heart-btn"
              onClick={() => toggleFavorite(product)}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`product-heart ${
                  isFavorite ? "product-heart-active" : ""
                }`}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
