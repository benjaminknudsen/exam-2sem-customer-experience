import { NavLink } from "react-router";

export default function FavoritesPage({
  favoriteItems,
  toggleFavorite,
  addToCart,
}) {
  if (favoriteItems.length === 0) {
    return (
      <main>
        <header>
          <h1>Favorites</h1>
        </header>
        <section className="favorites-empty">
          <p>You have no favorite products yet.</p>
          <NavLink to="/products" className="favorites-link">
            Go to products
          </NavLink>
        </section>
      </main>
    );
  }

  return (
    <main>
      <header>
        <h1>Favorites</h1>
      </header>
      <section className="favorites-grid">
        {favoriteItems.map((item) => (
          <article key={item.id} className="product-card">
            <NavLink to={`/products/${item.id}`} className="product-link">
              <img
                src={item.image}
                alt={item.title}
                className="product-image"
              />
              <div className="product-info">
                <div className="product-brand-row">
                  <p className="product-brand">{item.brand}</p>
                  <button
                    type="button"
                    className="product-heart-btn"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleFavorite(item);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="product-heart product-heart-active"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                <h2 className="product-title">{item.title}</h2>
                <p className="product-price">{item.price} kr.</p>
              </div>
            </NavLink>
            <button
              type="button"
              className="product-card-add"
              onClick={() => addToCart(item)}
            >
              Add to Bag
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
