import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { registeredUsers } from "./registeredUsers";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.length < 3 || password.length < 3) {
      setMessage("Email and password must be at least 3 characters.");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      setMessage("Please enter a valid Gmail address.");
      return;
    }
    const user = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      setMessage("Incorrect Gmail or password, or user is not registered.");
      return;
    }
    setMessage("Login successful!");
    navigate("/products");
  };

  return (
    <div className="login-form">
      <form className="login-form-content" onSubmit={handleLogin}>
        <h2 className="login-title">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <img
            src="/eye.png"
            className="eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        {message && <p className="error">{message}</p>}
        <button type="submit" className="login-button">
          Log in
        </button>
        <p className="login-register-link">
          Not a member?{" "}
          <span
            className="form-link"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
