import { NavLink } from "react-router";

const BASE = import.meta.env.BASE_URL;

export default function Navbar({ cartCount }) {
  return (
    <nav>
      <div className="nav-left">
        <NavLink to="/" className="nav-logo-link">
          <span className="nav-logo-text">blunt.</span>
        </NavLink>
        <NavLink to="/products">Shop</NavLink>
        <NavLink to="/new-arrivals">New arrivals</NavLink>
        <NavLink to="/outlet">Outlet</NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/search">
          <svg
            viewBox="0 0 24 24"
            className="nav-icon"
            aria-label="Søg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/profile">
          <svg
            viewBox="0 0 24 24"
            className="nav-icon"
            aria-label="Profil"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
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
          <svg
            viewBox="0 0 24 24"
            className="nav-icon"
            aria-label="Kurv"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            <path d="M16 7V5a4 4 0 0 0-8 0v2" />
          </svg>
          {cartCount > 0 ? (
            <span className="basket-count">{cartCount}</span>
          ) : null}
        </NavLink>
        <NavLink to="/language">
          <img
            src={`${BASE}engelskflag.svg`}
            alt="English flag"
            className="nav-flag"
          />
        </NavLink>
      </div>
    </nav>
  );
}
