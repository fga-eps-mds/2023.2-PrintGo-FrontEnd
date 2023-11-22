import "../style/pages/createUser.css";
import React from "react";
import SignupForm from "../components/forms/SignupForm";
import signup_image from "../assets/signup_image.svg";
import Navbar from "../components/navbar/Navbar";
export default function CreateUserPage() {
  return (
    <>
      <Navbar />
      <div id="signup-container">
        <img alt="" src={signup_image} />
        <SignupForm />
      </div>
    </>
  );
}
