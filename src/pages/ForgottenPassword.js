import "../style/pages/createUser.css";
import React from "react";
import signup_image from "../assets/signup_image.svg";
import Navbar from "../components/navbar/Navbar";
import ForgottenPasswordForm from "../components/forms/ForgottenPasswordForms";
export default function ForgottenPasswordPage() {
  return (
    <>
      <Navbar />
      <div id="signup-container">
        <img alt="" src={signup_image} />
        <ForgottenPasswordForm />
      </div>
    </>
  );
}
