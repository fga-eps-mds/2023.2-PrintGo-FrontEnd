import "../style/pages/createUser.css";
import React from "react";
import SignupForm from "../components/SignupForm";
import signup_image from "../assets/signup_image.svg";

export default function CreateUserPage(){
    return(
    
        <div className="container">
            <div className="signup-container">
                <img className="home-image" alt="" src={signup_image} />
                <SignupForm/>
            </div>
        </div>
    );
}