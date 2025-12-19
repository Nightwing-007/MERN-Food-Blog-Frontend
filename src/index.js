import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipes from "./pages/Recipes";

import AdminDashboard from "./pages/AdminDashboard";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import "./styles/global.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AdminOnlyRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/recipes",
        element: (
          <ProtectedRoute>
            <Recipes />
          </ProtectedRoute>
        ),
      },

      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-recipe",
        element: (
          <ProtectedRoute>
            <AddRecipe />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recipes/:id",
        element: (
          <ProtectedRoute>
            <RecipeDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
