import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css'; // Reusing the same CSS

const Signup = () => {
    return (
        <div className="container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label className="auth-label">Full Name</label>
                    <input type="text" placeholder="Your Name" className="auth-input" />

                    <label className="auth-label">Email Address</label>
                    <input type="email" placeholder="Your Email" className="auth-input" />

                    <label className="auth-label">Password</label>
                    <input type="password" placeholder="Create password" className="auth-input" />

                    <button type="submit" className="auth-btn">Sign Up</button>
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;