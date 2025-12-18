import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return (
        <div className="container" style={{ marginTop: '40px' }}>
            <div className="dash-header">
                <h1 className="dash-title">My Recipes Dashboard</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Recipes</h3>
                    <p className="stat-num">0</p>
                </div>
                <div className="stat-card">
                    <h3>Total Views</h3>
                    <p className="stat-num">0</p>
                </div>
                <div className="create-card" onClick={() => alert('Create Post Feature Coming Soon!')}>
                    <h3>+ Create New</h3>
                    <p style={{ margin: '10px 0 0' }}>Add a new recipe</p>
                </div>
            </div>

            <div className="content-area">
                <h2 style={{ marginTop: 0 }}>Manage Your Posts</h2>
                <p style={{ textAlign: 'center', color: '#777', marginTop: '50px' }}>You haven't posted any recipes yet.</p>
            </div>
        </div>
    );
};

export default Dashboard;