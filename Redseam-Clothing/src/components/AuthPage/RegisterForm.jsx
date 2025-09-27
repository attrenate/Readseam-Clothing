import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { registeredUsers } from "./registeredUsers";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const profilePic = "/pfp.jpg";

  const handleRegister = (e) => {
    e.preventDefault();

    // Validatation of email
    if (!email.endsWith("@gmail.com")) {
      setMessage("Please enter a valid Gmail address.");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    // Checking if the user exists
    const existingUser = registeredUsers.find((u) => u.email === email);
    if (existingUser) {
      setMessage("User already registered with this Gmail.");
      return;
    }

    // Minimum length check
    if (name.length < 3 || email.length < 3 || password.length < 3) {
      setMessage("Username, email, and password must be at least 3 characters.");
      return;
    }

    // Registering the user
    registeredUsers.push({ name, email, password });
    setMessage("Registration successful! Please login.");
    navigate("/"); // Redirect to login
  };

  return (
    <form className="login-form-content" onSubmit={handleRegister}>
      <h2 className="register-title">Registration</h2>
      <div className="register-profile-row">
        <img
          src={profilePic}
          alt="Profile"
          className="register-profile-pic"
        />
        <div className="register-profile-actions-horizontal">
          <div className="register-action upload">upload new</div>
          <div className="register-action remove">remove</div>
        </div>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="login-input"
        placeholder="Username *"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="login-input"
        placeholder="Email *"
      />
      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
          placeholder="Password *"
        />
        <img
          src="/eye.png"
          className="eye-icon"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </div>
      <div className="password-input-wrapper">
        <input
          type={showConfirm ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="login-input"
          placeholder="Confirm password *"
        />
        <img
          src="/eye.png"
          className="eye-icon"
          onClick={() => setShowConfirm((prev) => !prev)}
        />
      </div>
      {message && <p>{message}</p>}
      <button type="submit" className="login-button">Register</button>
      <p>
        Already have an account?{" "}
        <span className="form-link" onClick={() => navigate("/")}>
          Log in
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
