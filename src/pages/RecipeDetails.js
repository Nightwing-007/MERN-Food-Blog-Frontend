import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./../styles/recipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(
          `http://localhost:5000/api/recipes/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          setRecipe(data.data.recipe);

          fetch(`http://localhost:5000/api/users/view/${id}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });

          const statsResponse = await fetch(
            `http://localhost:5000/api/users/stats`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const statsData = await statsResponse.json();
          if (statsData.status === "success") {
            setIsFavorite(
              statsData.data.favorites.some((fav) => fav._id === id)
            );
          }
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Connection failed");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5000"
        }/api/users/favorite/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setIsFavorite(!isFavorite);
      } else {
        console.error("Error toggling favorite:", data.message);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  if (loading) return null;
  if (error) return <div className="container error">{error}</div>;

  if (!recipe) return null;

  return (
    <div className="container recipeDetails">
      <div className="recipe-Card">
        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} className="recipeImage" />
        )}

        <h1 className="title">{recipe.title}</h1>
        <span className="category">{recipe.category}</span>
        <span className="cookingTime">⏱️ {recipe.cookingTime} mins</span>

        <div className="section">
          <h3>Ingredients</h3>
          <ul className="ingredients">
            {recipe.ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Instructions</h3>
          <p className="instructions">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
