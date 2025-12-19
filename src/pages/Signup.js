import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (formData) => {
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert("Account Created Successfully!");
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        navigate("/");
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Is the server running?");
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-sub">Join us and start sharing your recipes</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="auth-label">Full Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Enter your full name"
            className="auth-input"
          />
          {errors.name && <div style={{ color: "red", fontSize: "0.9rem" }}>{errors.name.message}</div>}
          
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
            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
            type="password"
            placeholder="Enter your password"
            className="auth-input"
          />
          {errors.password && <div style={{ color: "red", fontSize: "0.9rem" }}>{errors.password.message}</div>}
          
          <label className="auth-label">Confirm Password</label>
          <input
            {...register("passwordConfirm", { 
              required: "Please confirm password",
              validate: value => value === password || "Passwords do not match"
            })}
            type="password"
            placeholder="Confirm your password"
            className="auth-input"
          />
          {errors.passwordConfirm && <div style={{ color: "red", fontSize: "0.9rem" }}>{errors.passwordConfirm.message}</div>}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
