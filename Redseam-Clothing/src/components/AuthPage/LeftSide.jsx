import React from "react";
import "./LeftSide.css";

const LeftSide = () => {
  return (
    <div className="left-side">
      <div className="logo">
        <div className="logo-child">
          <img src="/Vector.png" alt="Redseam Logo" className="logo-icon" />
        </div>       
        <h1 className="logo-text">Redseam Clothing</h1>
      </div>
      <img
        src="/public/loginpic.png"
        alt="Fashion showcase"
        className="background-image"
      />
    </div>
  );
};

export default LeftSide;
