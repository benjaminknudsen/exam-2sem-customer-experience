import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router";

export default function ProductsPage({
  addToCart,
  favoriteIds,
  toggleFavorite,
}) {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
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

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products],
  );

  const colors = useMemo(
    () => [...new Set(products.map((product) => product.color))],
    [products],
  );

  const brands = useMemo(
    () => [...new Set(products.map((product) => product.brand))],
    [products],
  );

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  function getProductSizes(product) {
    if (product.category === "Accessories") {
      return ["M", "L", "XL", "XXL"];
    }

    if (product.category === "Pants" || product.category === "Denim Jeans") {
      return ["S", "M", "L", "XL", "XXL"];
    }

    return ["XS", "S", "M", "L", "XL", "XXL"];
  }

  const highestPrice = useMemo(
    () =>
      products.length > 0
        ? Math.max(...products.map((product) => product.price))
        : 0,
    [products],
  );

  function toggleValue(value, selectedValues, setSelectedValues) {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
      return;
    }

    setSelectedValues([...selectedValues, value]);
  }

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(product.color);
      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => getProductSizes(product).includes(size));
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const priceMatch = maxPrice === 0 || product.price <= maxPrice;

      return (
        categoryMatch && colorMatch && sizeMatch && brandMatch && priceMatch
      );
    });

    if (sortBy === "price-asc") {
      return [...result].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      return [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    products,
    selectedCategories,
    selectedColors,
    selectedSizes,
    selectedBrands,
    maxPrice,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedColors.length > 0 ||
    selectedSizes.length > 0 ||
    selectedBrands.length > 0 ||
    (maxPrice > 0 && maxPrice < highestPrice) ||
    sortBy !== "featured";

  const colorSwatches = {
    Black: "#000000",
    Grey: "#8a8a8a",
    White: "#eeeeee",
    Blue: "#2c5de0",
    Green: "#2f8f2f",
    Red: "#e10600",
    Brown: "#7b5437",
  };

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSortBy("featured");
    setMaxPrice(0);
  }

  return (
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
                    selectedColors.includes(color) ? "color-swatch-active" : ""
                  }`}
                  onClick={() =>
                    toggleValue(color, selectedColors, setSelectedColors)
                  }
                  aria-label={`Filter by ${color}`}
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
                  <NavLink
                    to={`/products/${product.id}`}
                    className="product-link"
                  >
                    {product.discountLabel || product.lowStockLabel ? (
                      <div className="product-card-badges">
                        {product.discountLabel ? (
                          <span className="product-badge-discount">
                            {product.discountLabel}
                          </span>
                        ) : null}
                        {product.lowStockLabel ? (
                          <span className="product-badge-stock">
                            {product.lowStockLabel}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                    />
                    <div className="product-info">
                      <div className="product-brand-row">
                        <p className="product-brand">{product.brand}</p>
                        <button
                          type="button"
                          className="product-heart-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(product);
                          }}
                        >
                          <img
                            src={`${
                              import.meta.env.BASE_URL
                            }${favoriteIds.has(product.id) ? "heart-add.png" : "heart.png"}`}
                            alt="Favorite"
                            className="product-heart"
                          />
                        </button>
                      </div>
                      <h2 className="product-title">{product.title}</h2>
                      <div className="product-meta">
                        <span
                          className="product-color-dot"
                          role="img"
                          aria-label={`Color: ${product.color}`}
                          style={{
                            background:
                              colorSwatches[product.color] || "#d7d7d7",
                          }}
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
            <div className="sidebar-options">
              {sizeOptions.map((size) => (
                <label key={size} className="sidebar-option-row">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() =>
                      toggleValue(size, selectedSizes, setSelectedSizes)
                    }
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
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
            <summary>PRICE</summary>
            <div className="sidebar-price">
              <input
                type="range"
                min="0"
                max={highestPrice}
                value={maxPrice === 0 ? highestPrice : maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
              <p>0 - {maxPrice === 0 ? highestPrice : maxPrice} kr.</p>
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
            <p className="products-empty">Could not load products right now.</p>
          ) : null}

          <section className="products-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <NavLink
                  to={`/products/${product.id}`}
                  className="product-link"
                >
                  {product.discountLabel || product.lowStockLabel ? (
                    <div className="product-card-badges">
                      {product.discountLabel ? (
                        <span className="product-badge-discount">
                          {product.discountLabel}
                        </span>
                      ) : null}
                      {product.lowStockLabel ? (
                        <span className="product-badge-stock">
                          {product.lowStockLabel}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-info">
                    <div className="product-brand-row">
                      <p className="product-brand">{product.brand}</p>
                      <button
                        type="button"
                        className="product-heart-btn"
                        onClick={(e) => {
                          // prevent link navigation when clicking the heart
                          e.preventDefault();
                          e.stopPropagation();
                          setFavorites((prev) => ({
                            ...prev,
                            [product.id]: !prev[product.id],
                          }));
                        }}
                      >
                        <img
                          src={`${
                            import.meta.env.BASE_URL
                          }${favorites[product.id] ? "heart-add.png" : "heart.png"}`}
                          alt="Favorite"
                          className="product-heart"
                        />
                      </button>
                    </div>
                    <h2 className="product-title">{product.title}</h2>
                    <div className="product-meta">
                      <span
                        className="product-color-dot"
                        role="img"
                        aria-label={`Color: ${product.color}`}
                        style={{
                          background: colorSwatches[product.color] || "#d7d7d7",
                        }}
                      />
                      <div className="product-pricing">
                        {product.beforeprice ? (
                          <p className="before-price-card">
                            {product.beforeprice} kr.
                          </p>
                        ) : null}
                        <p className="product-price">{product.price} kr.</p>
                      </div>
                    </div>
                  </div>
                </NavLink>
                <button
                  type="button"
                  className="product-card-add"
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "See more" : "Out of stock"}
                </button>
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
    </main>
  );
}
