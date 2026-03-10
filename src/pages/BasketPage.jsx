import { NavLink } from "react-router";

export default function BasketPage({
  cartItems,
  cartTotal,
  updateQuantity,
  removeFromCart,
  clearCart,
}) {
  if (cartItems.length === 0) {
    return (
      <main>
        <header>
          <h1>Basket</h1>
        </header>
        <section className="basket-empty">
          <p>Your basket is empty.</p>
          <NavLink to="/products" className="basket-link">
            Go to products
          </NavLink>
        </section>
      </main>
    );
  }

  return (
    <>
      <header>
        <h1>Basket</h1>
      </header>
      <main className="basket-main">
        <section className="basket-list">
          {cartItems.map((item) => (
            <article key={item.id} className="basket-item">
              <img src={item.image} alt={item.title} className="basket-image" />

              <div className="basket-item-info">
                <p className="basket-brand">{item.brand}</p>
                <h2 className="basket-title">{item.title}</h2>
                <p className="basket-price">{item.price} kr.</p>
              </div>

              <div className="basket-actions">
                <div className="basket-quantity">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="basket-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="basket-summary">
          <h2>Order summary</h2>
          <p className="basket-total">Total: {cartTotal} kr.</p>
          <button type="button" className="basket-clear" onClick={clearCart}>
            Clear basket
          </button>
        </aside>
      </main>
    </>
  );
}
