import "../style/pages/editPattern.css";
import React from "react";
import EditPatternForm from "../components/forms/EditPatternForm";
import registerPrinter_image from "../assets/registerPrinter_image.svg";
import Navbar from "../components/navbar/Navbar";

export default function EditPattern() {
  return (
    <>
      <Navbar />
      <div id="editPattern-container">
        <img alt="homem" src={registerPrinter_image} />
        <EditPatternForm />
      </div>
    </>
  );
}
