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

              <img src={product.image} alt={product.title} className="product-image" />
              <h2>{product.brand}</h2>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Categori:</strong> {product.category}
              </p>
              <p>
                <strong>Color:</strong> {product.color}
              </p>
              <p>
                <strong>Price:</strong> {product.price} DKK
              </p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
