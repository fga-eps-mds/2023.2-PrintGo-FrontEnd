import "../style/pages/patternPrinter.css";
import React from "react";
import PrinterPatternForm from "../components/forms/PrinterPatternForm.js";
import registerPrinter_image from "../assets/registerPrinter_image.svg";

export default function PatternPrinter(){
    return(
        <div id="register-printer-pattern-container">
            <img alt="" src={registerPrinter_image} />
            <PrinterPatternForm/>
        </div>
    );
}