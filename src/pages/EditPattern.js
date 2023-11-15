import "../style/pages/editPattern.css";
import React from "react";
import EditPatternForm from "../components/forms/EditPatternForm";
import registerPrinter_image from "../assets/registerPrinter_image.svg";

export default function EditPattern() {
  return (
    <div id="editPattern-container">
      <img alt="homem" src={registerPrinter_image} />
      <EditPatternForm />
    </div>
  );
}
