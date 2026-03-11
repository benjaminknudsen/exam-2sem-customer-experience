import { NavLink } from "react-router";

export default function Navbar({ cartCount }) {
  const logoSrc = `${import.meta.env.BASE_URL}blunt.logo.png`;
  const searchSrc = `${import.meta.env.BASE_URL}searchbar.png`;
  const profileSrc = `${import.meta.env.BASE_URL}profile-circle.png`;
  const basketSrc = `${import.meta.env.BASE_URL}bag-2.png`;
  const flagSrc = `${import.meta.env.BASE_URL}engelskflag.svg`;

  return (
    <nav>
      <div className="nav-left">
        <NavLink to="/">
          <img src={logoSrc} alt="Blunt" className="nav-logo" />
        </NavLink>
        <NavLink to="/products">Shop</NavLink>
        <NavLink to="/new-arrivals">New arrivals</NavLink>
        <NavLink to="/outlet">Outlet</NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/search">
          <img src={searchSrc} alt="Søg" className="nav-searchbar" />
        </NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/profile">
          <img src={profileSrc} alt="profile" className="nav-profile" />
        </NavLink>
        <NavLink to="/favorites" className="nav-heart-link">
          <svg
            viewBox="0 0 24 24"
            aria-label="Favoritter"
            className="nav-heart product-heart"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </NavLink>
        <NavLink to="/basket" className="basket-link-nav">
          <img src={basketSrc} alt="Kurv" className="nav-basket" />
          {cartCount > 0 ? (
            <span className="basket-count">{cartCount}</span>
          ) : null}
        </NavLink>
        <NavLink to="/language">
          <img src={flagSrc} alt="English flag" className="nav-flag" />
        </NavLink>
      </div>
    </nav>
  );
}
