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
          <article key={item.id} className="favorite-card">
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
                    <img
                      src={`${import.meta.env.BASE_URL}heart-add.png`}
                      alt="Favorite"
                      className="product-heart"
                    />
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
