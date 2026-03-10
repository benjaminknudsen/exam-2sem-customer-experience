import { Routes, Route } from "react-router";
import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BasketPage from "./pages/BasketPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          brand: product.brand,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId),
      );
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div className="shipping-banner">Hit 499 DKK. Shipping's on us.</div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route
          path="/products"
          element={<ProductsPage addToCart={addToCart} />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetailPage addToCart={addToCart} />}
        />
        <Route
          path="/basket"
          element={
            <BasketPage
              cartItems={cartItems}
              cartTotal={cartTotal}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
