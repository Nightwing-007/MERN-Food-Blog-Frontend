import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [stats, setStats] = useState({
    recipesCount: 0,
    viewedCount: 0,
    userRecipes: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5000"
        }/api/users/stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const handleFocus = () => fetchStats();
    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <div className="header">
        <h1 className="title">My Recipes Dashboard</h1>
        <div>
          <button
            onClick={fetchStats}
            className="refreshButton"
            style={{ marginRight: "10px", background: "#28a745" }}
          >
            Refresh
          </button>
          <button onClick={handleLogout} className="logoutButton">
            Logout
          </button>
        </div>
      </div>

      <div className="stats">
        <div className="card">
          <h3>My Recipes</h3>
          <p className="number">{stats.recipesCount}</p>
        </div>
        <div className="card">
          <h3>Total Views</h3>
          <p className="number">{stats.viewedCount}</p>
        </div>
        <div
          className="card createCard"
          onClick={() => navigate("/add-recipe")}
        >
          <h3>Create Recipe</h3>
          <p style={{ color: "darkred", margin: "10px 0 0" }}>
            Add a new recipe
          </p>
        </div>
      </div>

      <div className="content">
        <h2 style={{ marginTop: 0 }}>Your Activity</h2>
        <div>
          <div style={{ marginBottom: "30px" }}>
            <h3>My Recipe Posts</h3>
            {stats.userRecipes && stats.userRecipes.length > 0 ? (
              <div>
                {stats.userRecipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    style={{
                      padding: "10px",
                      border: "1px solid #eee",
                      margin: "5px 0",
                      borderRadius: "5px",
                    }}
                  >
                    <span
                      style={{ cursor: "pointer", color: "darkred" }}
                      onClick={() => navigate(`/recipes/${recipe._id}`)}
                    >
                      {recipe.title}
                    </span>
                    <span
                      style={{
                        marginLeft: "10px",
                        color: "#666",
                        fontSize: "12px",
                      }}
                    >
                      ({recipe.category})
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#777" }}>
                No recipes created yet.{" "}
                <span
                  style={{ color: "darkred", cursor: "pointer" }}
                  onClick={() => navigate("/add-recipe")}
                >
                  Create your first recipe
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
