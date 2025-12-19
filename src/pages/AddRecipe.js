import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddRecipe = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "Dinner",
    },
  });

  const onSubmit = async (formData) => {
    const token = localStorage.getItem("jwt");
    const formattedData = {
      ...formData,
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
    };

    try {
      const res = await fetch(`http://localhost:5000/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Recipe Added Successfully!");
        navigate("/recipes");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="container" style={{ marginTop: "50px", maxWidth: "600px" }}>
      <h2 style={{ textAlign: "center", color: "darkred" }}>Add New Recipe</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label style={{ fontWeight: "bold" }}>Recipe Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          style={{ padding: "10px" }}
        />
        {errors.title && (
          <span style={{ color: "red" }}>{errors.title.message}</span>
        )}

        <label style={{ fontWeight: "bold" }}>Category</label>
        <select {...register("category")} style={{ padding: "10px" }}>
          <option value="Dinner">Dinner</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dessert">Dessert</option>
          <option value="Snack">Snack</option>
        </select>

        <label style={{ fontWeight: "bold" }}>Image URL</label>
        <input {...register("image")} style={{ padding: "10px" }} />

        <label style={{ fontWeight: "bold" }}>Cooking Time (minutes)</label>
        <input
          {...register("cookingTime", { required: "Cooking time is required" })}
          type="number"
          style={{ padding: "10px" }}
        />
        {errors.cookingTime && (
          <span style={{ color: "red" }}>{errors.cookingTime.message}</span>
        )}

        <label style={{ fontWeight: "bold" }}>Ingredients</label>
        <textarea
          {...register("ingredients", { required: "Ingredients are required" })}
          style={{ padding: "10px", height: "80px" }}
        />
        {errors.ingredients && (
          <span style={{ color: "red" }}>{errors.ingredients.message}</span>
        )}

        <label style={{ fontWeight: "bold" }}>Instructions</label>
        <textarea
          {...register("instructions", {
            required: "Instructions are required",
          })}
          style={{ padding: "10px", height: "100px" }}
        />
        {errors.instructions && (
          <span style={{ color: "red" }}>{errors.instructions.message}</span>
        )}

        <button
          type="submit"
          style={{
            padding: "15px",
            background: "darkred",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
