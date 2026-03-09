import { NavLink } from "react-router";

export default function HomePage() {
  const landingBg = `${import.meta.env.BASE_URL}landingpagebackground.png`;

  return (
    <main className="home-main">
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
