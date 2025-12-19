import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5000"
          }/api/recipes`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          setRecipes(data.data.recipes);
        } else {
          setError("Session expired. Please login again.");
          localStorage.removeItem("jwt");
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (err) {
        setError("Failed to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [navigate]);

  const filteredRecipes =
    filter === "All" ? recipes : recipes.filter((r) => r.category === filter);

  if (loading) return null;

  if (error) {
    return (
      <div
        className="container"
        style={{ marginTop: "50px", textAlign: "center", color: "red" }}
      >
        {error}
      </div>
    );
  }

  return (
    <div className="container recipes">
      <div className="header">
        <h1>All Recipes</h1>
        <p>Explore our collection of delicious meals</p>
      </div>

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter ${filter === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {filteredRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="recipeCard"
              style={{ width: "300px" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {recipe.image && recipe.image.startsWith("http") ? (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "3rem" }}>🥘</span>
                )}
              </div>
              <div style={{ padding: "20px" }}>
                <span
                  style={{
                    color: "gold",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                  }}
                >
                  {recipe.category}
                </span>
                <h3 style={{ margin: "10px 0", color: "#333" }}>
                  {recipe.title}
                </h3>
                <Link
                  to={`/recipes/${recipe._id}`}
                  style={{
                    color: "darkred",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  View Recipe &rarr;
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recipes;
