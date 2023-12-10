import "../style/pages/forgottenPassword.css";
import React from "react";
import signup_image from "../assets/signup_image.svg";
import elipse from '../assets/elipse6.svg';
import Navbar from "../components/navbar/Navbar";
import ForgottenPasswordForm from "../components/forms/ForgottenPasswordForms";
export default function ForgottenPasswordPage() {
  return (
    <>
      <Navbar />
      <div id="forgotpassword-container" data-testid="forgotpassword-container">
        <img alt="" src={signup_image} />
        <ForgottenPasswordForm />
        <div className="forgotpassword-elipse">
          <img alt= "elipse"  src={elipse}></img>
        </div>
      </div>
    </>
  );
}
