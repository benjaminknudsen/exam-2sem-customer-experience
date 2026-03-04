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
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Kategori:</strong> {product.category}
              </p>
              <p>
                <strong>Pris:</strong> {product.price} DKK
              </p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
