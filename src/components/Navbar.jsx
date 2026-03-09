import { NavLink } from "react-router";

export default function Navbar() {
  const logoSrc = `${import.meta.env.BASE_URL}blunt.logo.png`;
  const searchSrc = `${import.meta.env.BASE_URL}searchbar.png`;

  return (
    <nav>
      <NavLink to="/">
        <img src={logoSrc} alt="Blunt" className="nav-logo" />
      </NavLink>
      <NavLink to="/products">Shop</NavLink>
      <NavLink to="/about">New arrivals</NavLink>
      <NavLink to="/services">Outlet</NavLink>
      <NavLink to="/search" className="search-link">
        <img src={searchSrc} alt="Søg" className="nav-searchbar" />
      </NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}
