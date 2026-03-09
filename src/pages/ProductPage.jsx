import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch("products.json");
      const data = await response.json();
      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <>
      <header>
        <h1>Products</h1>
      </header>
      <main>
        <section className="products-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <div className="product-info">
                <p className="product-brand">{product.brand}</p>
                <h2 className="product-title">{product.title}</h2>
                <div className="product-meta">
                  <p className="product-color">{product.color}</p>
                  <div className="product-pricing">
                    {product.beforeprice ? (
                      <p className="before-price">{product.beforeprice} kr.</p>
                    ) : null}
                    <p className="product-price">{product.price} kr.</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
