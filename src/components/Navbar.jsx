import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">LOGO</NavLink>
      <NavLink to="/products">Shop</NavLink>
      <NavLink to="/about">New arrivals</NavLink>
      <NavLink to="/services">Outlet</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}
