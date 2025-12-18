import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return (
        <div className="container" style={{ marginTop: '40px' }}>
            <div className="admin-header">
                <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
                <div className="admin-actions">
                    <span style={{ fontWeight: 'bold' }}>Admin User</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>

            <div className="admin-stats">
                <div className="admin-stat-card">
                    <h3>Total Users</h3>
                    <p className="admin-stat-num">12</p>
                </div>
                <div className="admin-stat-card">
                    <h3>Total Posts</h3>
                    <p className="admin-stat-num">45</p>
                </div>
            </div>

            <h2>User Management</h2>
            <div className="user-table-container">
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Deepak</td>
                        <td>deepak@gmail.com</td>
                        <td>User</td>
                        <td><button className="delete-btn">Delete</button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sujay</td>
                        <td>sujay@google.com</td>
                        <td>User</td>
                        <td><button className="delete-btn">Delete</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;