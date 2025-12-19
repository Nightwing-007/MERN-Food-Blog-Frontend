import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("jwt");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Parotta Payaluga</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {isLoggedIn ? (
          <>
            <Link to="/recipes">Recipes</Link>
            <Link to="/add-recipe">Add Recipe</Link>
            {user.role === "admin" && (
              <Link to="/admin">Dashboard</Link>
            )}
            <button onClick={handleLogout} className="btn-nav">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-nav">
              Login
            </Link>
            <Link to="/signup" className="btn-nav">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
