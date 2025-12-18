import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar">
            <div className="logo">🍲 Pinch of Clone</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to="/about">About</Link>
                <Link to="/login" className="btn-nav">Login</Link>
                <Link to="/signup" className="btn-nav">Signup</Link>
                {/* Temporary Links */}
                <Link to="/dashboard" style={{ fontSize: '0.8rem', opacity: 0.8 }}>[Dash]</Link>
                <Link to="/admin" style={{ fontSize: '0.8rem', opacity: 0.8 }}>[Admin]</Link>
            </div>
        </nav>
    );
};

export default Header;