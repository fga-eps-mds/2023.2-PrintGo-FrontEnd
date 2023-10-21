import React from "react";
import "../style/components/input.css";

export default function Input(props) {
    return (
        <div className="input">
            <label>
                {props.label}
                <input placeholder={props.placeholder} />
            </label>
        </div>
    );
}
