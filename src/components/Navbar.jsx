import { NavLink } from "react-router";

export default function Navbar({ cartCount }) {
  const logoSrc = `${import.meta.env.BASE_URL}blunt.logo.png`;
  const searchSrc = `${import.meta.env.BASE_URL}searchbar.png`;
  const profileSrc = `${import.meta.env.BASE_URL}profile-circle.png`;
  const heartSrc = `${import.meta.env.BASE_URL}heart.png`;
  const basketSrc = `${import.meta.env.BASE_URL}bag-2.png`;
  const flagSrc = `${import.meta.env.BASE_URL}twemoji_flag-denmark.png`;

  return (
    <nav>
      <div className="nav-left">
        <NavLink to="/">
          <img src={logoSrc} alt="Blunt" className="nav-logo" />
        </NavLink>
        <NavLink to="/products">Shop</NavLink>
        <NavLink to="/about">New arrivals</NavLink>
        <NavLink to="/services">Outlet</NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/search">
          <img src={searchSrc} alt="Søg" className="nav-searchbar" />
        </NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/profile">
          <img src={profileSrc} alt="profile" className="nav-profile" />
        </NavLink>
        <NavLink to="/favorites">
          <img src={heartSrc} alt="Favoritter" className="nav-heart" />
        </NavLink>
        <NavLink to="/basket" className="basket-link-nav">
          <img src={basketSrc} alt="Kurv" className="nav-basket" />
          {cartCount > 0 ? (
            <span className="basket-count">{cartCount}</span>
          ) : null}
        </NavLink>
        <NavLink to="/language">
          <img src={flagSrc} alt="Danmark flag" className="nav-flag" />
        </NavLink>
      </div>
    </nav>
  );
}
