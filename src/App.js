import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recipes from './pages/Recipes';           // <-- NEW
import Dashboard from './pages/Dashboard';       // <-- NEW
import AdminDashboard from './pages/AdminDashboard'; // <-- NEW

// Import Global Styles
import './styles/global.css';

function App() {
  return (
      <Router>
        <div className="App">
          {/* Navigation Bar */}
          <nav className="navbar">
            <div className="logo">🍲 Pinch of Clone</div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/recipes">Recipes</Link>
              <Link to="/about">About</Link>
              <Link to="/login" className="btn-nav">Login</Link>
              <Link to="/signup" className="btn-nav">Signup</Link>
              {/* Temporary links for testing */}
              <Link to="/dashboard" style={{ fontSize: '0.8rem', opacity: 0.8 }}>[Dash]</Link>
              <Link to="/admin" style={{ fontSize: '0.8rem', opacity: 0.8 }}>[Admin]</Link>
            </div>
          </nav>

          {/* Page Content */}
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>

          {/* Footer */}
          <footer className="footer">
            &copy; 2025 Food Blog Project | MERN Stack
          </footer>
        </div>
      </Router>
  );
}

export default App;