import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert("Login Successful!");

        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Is the server running?");
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Login to manage your blog posts</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="auth-label">Email Address</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your email"
            className="auth-input"
          />
          {errors.email && <div style={{ color: "red", fontSize: "0.9rem" }}>{errors.email.message}</div>}

          <label className="auth-label">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter your password"
            className="auth-input"
          />
          {errors.password && <div style={{ color: "red", fontSize: "0.9rem" }}>{errors.password.message}</div>}

          {error && (
            <div
              style={{
                color: "red",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
