import "../style/pages/editPrinter.css";
import React from "react";
import EditPrinterForm from "../components/forms/EditPrinterForm.js";
import editPrinter_image from "../assets/editPrinter_image.svg";

export default function EditPrinterPage(){
    return(
        <div id="editPrinter-container">
            <img alt="" src={editPrinter_image} />
            <EditPrinterForm/>
        </div>
    );
}