import "../style/pages/editPrinter.css";
import React from "react";
import EditPrinterForm from "../components/forms/EditPrinterForm.js";
import registerPrinter_image from "../assets/registerPrinter_image.svg";

export default function EditPrinterPage(){
    return(
        <div id="editPrinter-container">
            <img alt="" src={registerPrinter_image} />
            <EditPrinterForm/>
        </div>
    );
}