import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetailPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // local favourite state for this detail view
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function load() {
      // use absolute path so it works regardless of current route
      const res = await fetch(`${import.meta.env.BASE_URL}products.json`);
      const data = await res.json();
      const found = data.find((p) => String(p.id) === id);
      setProduct(found);
    }
    load();
  }, [id]);

  if (!product) return <p>Loading…</p>;

  // if id is invalid or data doesn't contain the product
  if (product === undefined) {
    return <p>Product not found.</p>;
  }

  return (
    <>
      <main>
        <section className="product-detail">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <div className="product-info">
            {/* small category text on top */}
            <p className="product-category">{product.category}</p>
            <p className="product-brand">{product.brand}</p>
            <h2 className="product-title-detail">{product.title}</h2>

            {/* price directly under the title */}
            <div className="product-pricing detail-pricing">
              {product.beforeprice ? (
                <p className="before-price">{product.beforeprice} kr.</p>
              ) : null}
              <p className="product-price">{product.price} kr.</p>
            </div>

            {/* product color text removed here; color selector remains below */}

            <p className="product-description">{product.description}</p>

            {/* simple color/size selectors (static layout) */}
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
                  {["XS", "S", "M", "L", "XL"].map((sz) => (
                    <button key={sz} className="size-btn">
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="product-actions">
              <button
                type="button"
                className="add-to-bag"
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Bag" : "Out of stock"}
              </button>
              <button
                type="button"
                className="product-heart-btn"
                onClick={() => setIsFavorite((f) => !f)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${
                    isFavorite ? "heart-add.png" : "heart.png"
                  }`}
                  alt="Favorite"
                  className="product-heart"
                />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
