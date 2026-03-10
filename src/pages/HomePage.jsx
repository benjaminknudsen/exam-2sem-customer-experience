import { useState } from "react";
import { NavLink } from "react-router";

export default function HomePage() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const landingBg = `${import.meta.env.BASE_URL}landingpagebackground.png`;
  const designImage = `${import.meta.env.BASE_URL}blunt.design.png`;
  const afterHoursImage = `${import.meta.env.BASE_URL}after.hours.png`;
  const essentialImage = `${import.meta.env.BASE_URL}essential.png`;
  const collections = [
    {
      title: "CORE DROP",
      subtitle: "Essentials",
      image: essentialImage,
      variant: "light",
    },
    {
      image: designImage,
      variant: "dark",
    },
    {
      title: "AFTER HOURS",
      subtitle: "Urban",
      image: afterHoursImage,
      variant: "light",
      textTone: "light-text",
    },
  ];
  const socialProof = [
    { value: "100%", label: "Authentic", tone: "red" },
    { value: "10k+", label: "Community members", tone: "blue" },
    { value: "4.8*", label: "Trustpilot", tone: "orange" },
    { value: "7+", label: "Top brands", tone: "purple" },
    { value: "90%", label: "Sell out rate on drops", tone: "green" },
  ];

  return (
    <main className="home-main">
      {isPopupOpen && (
        <div
          className="landing-popup-overlay"
          onClick={() => setIsPopupOpen(false)}
        >
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

      <section className="home-about-section" aria-label="About Blunt">
        <img
          src={designImage}
          alt="Blunt design"
          className="home-about-image"
        />

        <div className="home-about-content">
          <p className="home-about-kicker">About us</p>
          <h2 className="home-about-title">Find your fit with Blunt</h2>
          <p className="home-about-text">
            We are a curated streetwear retail store built for those who move
            with confidence. Our focus is simple: quality pieces, strong brands,
            and drops that matter. We select every item with intention,
            balancing style, value, and authenticity. Whether you are looking
            for everyday essentials or standout pieces, we bring together
            collections that reflect culture and individuality. We believe
            shopping should feel effortless, inspiring, and real. Step inside
            and find pieces that speak your language and match your pace.
          </p>
          <a href="#" className="home-about-link">
            Learn More <span aria-hidden="true">{">"}</span>
          </a>
        </div>
      </section>

      <section className="home-collections" aria-label="Collections">
        <p className="home-collections-kicker">Our collections</p>
        <h2 className="home-collections-title">What We Can Offer You</h2>

        <div className="home-collections-grid">
          {collections.map((item) => (
            <article key={item.title} className="collection-card">
              <img
                src={item.image}
                alt={item.title}
                className="collection-card-image"
              />
              <div
                className={`collection-card-overlay ${item.variant} ${item.textTone || ""}`}
              >
                <div>
                  <p className="collection-card-title">{item.title}</p>
                  <p className="collection-card-subtitle">{item.subtitle}</p>
                </div>
                <NavLink to="/products" className="collection-card-link">
                  Learn More <span aria-hidden="true">{">"}</span>
                </NavLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-proof" aria-label="Why choose us">
        <p className="home-proof-kicker">Choose Us</p>
        <h2 className="home-proof-title">Why Choose Us ?</h2>

        <div className="home-proof-grid">
          {socialProof.map((item) => (
            <article key={item.label} className="proof-card">
              <p className={`proof-value proof-${item.tone}`}>{item.value}</p>
              <p className="proof-label">{item.label}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
