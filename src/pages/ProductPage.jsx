import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch(`${import.meta.env.BASE_URL}products.json`);

      if (!response.ok) {
        setError(true);
        setProducts([]);
        return;
      }

      const data = await response.json();
      setError(false);
      setProducts(data);
    }

    loadProducts();
  }, []);

  useEffect(() => {
    const nextCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    const nextColors = [...new Set(products.map((product) => product.color))];
    const nextBrands = [...new Set(products.map((product) => product.brand))];
    const nextHighestPrice =
      products.length > 0
        ? Math.max(...products.map((product) => product.price))
        : 0;

    setCategories(nextCategories);
    setColors(nextColors);
    setBrands(nextBrands);
    setHighestPrice(nextHighestPrice);
  }, [products]);

  useEffect(() => {
    if (highestPrice > 0) {
      setMaxPrice(highestPrice);
    }
  }, [highestPrice]);

  function toggleValue(value, selectedValues, setSelectedValues) {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
      return;
    }

    setSelectedValues([...selectedValues, value]);
  }

  useEffect(() => {
    const result = products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(product.color);
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const priceMatch = maxPrice === 0 || product.price <= maxPrice;

      return categoryMatch && colorMatch && brandMatch && priceMatch;
    });

    if (sortBy === "price-asc") {
      setFilteredProducts([...result].sort((a, b) => a.price - b.price));
      return;
    }

    if (sortBy === "price-desc") {
      setFilteredProducts([...result].sort((a, b) => b.price - a.price));
      return;
    }

    setFilteredProducts(result);
  }, [
    products,
    selectedCategories,
    selectedColors,
    selectedBrands,
    maxPrice,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedColors.length > 0 ||
    selectedBrands.length > 0 ||
    maxPrice < highestPrice ||
    sortBy !== "featured";

  const colorSwatches = {
    Black: "#000000",
    Grey: "#8a8a8a",
    White: "#eeeeee",
    Blue: "#2c5de0",
    Red: "#e10600",
    Brown: "#7b5437",
  };

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSortBy("featured");
    setMaxPrice(highestPrice);
  }

  return (
    <>
      <header>
        <h1>Products</h1>
      </header>
      <main className="products-main">
        <div className="products-layout">
          <aside className="products-sidebar" aria-label="Product filters">
            <details open className="sidebar-group">
              <summary>PRODUCT TYPE</summary>
              <div className="sidebar-options">
                {categories.map((category) => (
                  <label key={category} className="sidebar-option-row">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() =>
                        toggleValue(
                          category,
                          selectedCategories,
                          setSelectedCategories,
                        )
                      }
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </details>

            <details className="sidebar-group">
              <summary>COLORS</summary>
              <div className="sidebar-colors">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-swatch ${
                      selectedColors.includes(color)
                        ? "color-swatch-active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleValue(color, selectedColors, setSelectedColors)
                    }
                    aria-label={`Filter by ${color}`}
                  >
                    <span
                      className="color-swatch-dot"
                      style={{ background: colorSwatches[color] || "#d7d7d7" }}
                    />
                    <span className="color-swatch-label">{color}</span>
                  </button>
                ))}
              </div>
            </details>

            <details className="sidebar-group">
              <summary>SIZE</summary>
            </details>

            <details className="sidebar-group">
              <summary>BRANDS</summary>
              <div className="sidebar-options">
                {brands.map((brand) => (
                  <label key={brand} className="sidebar-option-row">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() =>
                        toggleValue(brand, selectedBrands, setSelectedBrands)
                      }
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </details>

            <details open className="sidebar-group">
              <summary>PRIZE</summary>
              <div className="sidebar-price">
                <input
                  type="range"
                  min="0"
                  max={highestPrice}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                />
                <p>0 - {maxPrice} kr.</p>
              </div>
            </details>

            <details className="sidebar-group">
              <summary>SORT BY</summary>
              <div className="sidebar-sort-wrap">
                <select
                  className="sidebar-sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price low-high</option>
                  <option value="price-desc">Price high-low</option>
                </select>
              </div>
            </details>

            <button
              type="button"
              className="filter-reset"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              Reset filters
            </button>
          </aside>

          <section>
            <p className="filter-result-count">
              Showing {filteredProducts.length} products
            </p>

            {error ? (
              <p className="products-empty">
                Could not load products right now.
              </p>
            ) : null}

            <section className="products-grid">
              {filteredProducts.map((product) => (
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
                          <p className="before-price">
                            {product.beforeprice} kr.
                          </p>
                        ) : null}
                        <p className="product-price">{product.price} kr.</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {filteredProducts.length === 0 ? (
                <p className="products-empty">
                  No products match the selected filters.
                </p>
              ) : null}
            </section>
          </section>
        </div>
      <main>
        <section className="products-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <NavLink to={`/products/${product.id}`} className="product-link">
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
                        <p className="before-price">
                          {product.beforeprice} kr.
                        </p>
                      ) : null}
                      <p className="product-price">{product.price} kr.</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
