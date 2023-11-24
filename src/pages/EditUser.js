import "../style/pages/editUser.css";
import React from "react";
import EditUserForm from "../components/forms/EditUserForm";
import signup_image from "../assets/signup_image.svg";
import Navbar from "../components/navbar/Navbar";
export default function EditUserPage() {
  return (
    <>
      <Navbar />
      <div id="edit-user-container">
        <img alt="" src={signup_image} />
        <EditUserForm />
      </div>
    </>
  );
}
