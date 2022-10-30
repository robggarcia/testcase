import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, token }) => {
  return (
    <div className="navbar">
      <h2>Fitness Trackr</h2>
      <div className="links">
        <Link to="/">HOME</Link>
        <Link to="/routines">ROUTINES</Link>
        {token && <Link to="/account/routines">MY ROUTINES</Link>}
        <Link to="/activities">ACTIVITIES</Link>
        {!token && <Link to="/login">LOGIN</Link>}
        {token && <Link to="/logout">LOGOUT</Link>}
      </div>
    </div>
  );
};

export default Navbar;
