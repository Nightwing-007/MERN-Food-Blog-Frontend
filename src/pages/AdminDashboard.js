import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const [usersRes, recipesRes] = await Promise.all([
        fetch(`http://localhost:5000/api/users/admin/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`http://localhost:5000/api/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const usersData = await usersRes.json();
      const recipesData = await recipesRes.json();

      if (usersData.status === "success") setUsers(usersData.data.users);
      if (recipesData.status === "success")
        setRecipes(recipesData.data.recipes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("jwt");
      await fetch(`http://localhost:5000/api/users/admin/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRecipe = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      const token = localStorage.getItem("jwt");
      await fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <div className="adminHeader">
        <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
        <div className="adminActions">
          <span style={{ fontWeight: "bold" }}>Admin User</span>
          <button onClick={handleLogout} className="logoutButton">
            Logout
          </button>
        </div>
      </div>

      <div className="adminStats">
        <div className="statCard">
          <h3>Total Users</h3>
          <p className="statNumber">{users.length}</p>
        </div>
        <div className="statCard">
          <h3>Total Recipes</h3>
          <p className="statNumber">{recipes.length}</p>
        </div>
        <div
          className="statCard createCard"
          onClick={() => navigate("/add-recipe")}
          style={{ cursor: "pointer", background: "#28a745" }}
        >
          <h3>Add Recipe</h3>
          <p style={{ margin: "10px 0 0", color: "white" }}>
            Create new recipe
          </p>
        </div>
      </div>

      <h2>User Management</h2>
      <div className="tableContainer">
        <table className="userTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role !== "admin" && (
                    <button
                      className="deleteButton"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Recipe Management</h2>
      <div className="tableContainer">
        <table className="userTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.title}</td>
                <td>{recipe.category}</td>
                <td>{recipe.createdBy?.name || "Unknown"}</td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
