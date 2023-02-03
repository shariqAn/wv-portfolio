import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import React from "react";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return "";
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard">Home</Link>
      <Link to="/dashboard">Project Calendar</Link>
      <Link to="/" onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
