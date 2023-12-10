import "../style/pages/patternPrinter.css";
import React from "react";
import PrinterPatternForm from "../components/forms/PrinterPatternForm.js";
import patternPrinter from "../assets/registerPrinter_image.svg";
import Navbar from "../components/navbar/Navbar";

export default function PatternPrinter() {
  return (
    <>
      <Navbar />
      <div id="register-printer-pattern-container" data-testid="register-printer-pattern-container">
        <img alt="man" src={patternPrinter} />
        <PrinterPatternForm />
      </div>
    </>
  );
}
