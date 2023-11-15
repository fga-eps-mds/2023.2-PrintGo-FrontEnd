import "../style/pages/patternPrinter.css";
import React from "react";
import PrinterPatternForm from "../components/forms/PrinterPatternForm.js";
import patternPrinter from "../assets/registerPrinter_image.svg";

export default function PatternPrinter() {
  return (
    <div id="register-printer-pattern-container">
      <img alt="man" src={patternPrinter} />
      <PrinterPatternForm />
    </div>
  );
}
