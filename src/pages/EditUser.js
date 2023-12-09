import "../style/pages/editUser.css";
import React from "react";
import EditUserForm from "../components/forms/EditUserForm";
import signup_image from "../assets/signup_image.svg";
import elipse6 from '../assets/elipse6.svg';
import Navbar from "../components/navbar/Navbar";

export default function EditUserPage() {
  return (
    <>
      <Navbar />
      <div id="edit-user-container">
        <img alt="pessoas" src={signup_image} />
        <EditUserForm />
        <div className="elipse-edit-user">
            <img alt= "elipse"  src={elipse6}></img>
        </div>
      </div>
    </>
  );
}
