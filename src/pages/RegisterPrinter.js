import "../style/pages/registerPrinter.css";
import React from "react";
import RegisterPrinterForm from "../components/forms/RegisterPrinterForm.js";
import registerPrinter_image from "../assets/registerPrinter_image.svg";

export default function RegisterPrinterPage(){
    return(
        <div id="registerPrinter-container">
            <img alt="" src={registerPrinter_image} />
            <RegisterPrinterForm/>
        </div>
    );
}