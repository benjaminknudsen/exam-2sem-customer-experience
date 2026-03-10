import { useState } from "react";
import { NavLink } from "react-router";

export default function HomePage() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const landingBg = `${import.meta.env.BASE_URL}landingpagebackground.png`;

  return (
    <main className="home-main">
      {isPopupOpen && (
        <div className="landing-popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <section
            className="landing-popup"
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter signup"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="landing-popup-close"
              type="button"
              aria-label="Close popup"
              onClick={() => setIsPopupOpen(false)}
            >
              x
            </button>
            <p className="landing-popup-eyebrow">Enter your email to unlock</p>
            <h2 className="landing-popup-title">15% off your first order</h2>
            <p className="landing-popup-text">
              Plus, get insider access to promotions, launches, events, and more
            </p>
            <form className="landing-popup-form">
              <input
                type="email"
                className="landing-popup-input"
                placeholder="Enter your email address"
                aria-label="Email address"
              />
              <button type="submit" className="landing-popup-submit">
                Unlock Access
              </button>
            </form>
          </section>
        </div>
      )}

      <div className="home-hero-wrap">
        <img
          src={landingBg}
          alt="Landing page background"
          className="home-hero-image"
        />
        <NavLink to="/products" className="home-cta-button">
          Find your fit
        </NavLink>
      </div>
    </main>
  );
}
