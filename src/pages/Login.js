import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
    return (
        <div className="container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-sub">Login to manage your blog posts</p>

                <form onSubmit={(e) => e.preventDefault()}>
                    <label className="auth-label">Email Address</label>
                    <input type="email" placeholder="Enter your email" className="auth-input" />

                    <label className="auth-label">Password</label>
                    <input type="password" placeholder="Enter your password" className="auth-input" />

                    <button type="submit" className="auth-btn">Login</button>
                </form>
                <p className="auth-footer">
                    Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;