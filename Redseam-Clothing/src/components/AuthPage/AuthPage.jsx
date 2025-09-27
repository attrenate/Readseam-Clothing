import React from "react";
import LeftSide from "./LeftSide";
import LoginForm from "./LoginForm";
import "./AuthPage.css";

const AuthPage = () => (
  <div className="auth-page">
    <LeftSide />
    <LoginForm />
  </div>
);

export default AuthPage;
