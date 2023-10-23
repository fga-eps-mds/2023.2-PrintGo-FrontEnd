import React from "react";
import "../style/components/input.css"

export default function Input(props) {
    return (
        <div className="Input">
            <label>
                {props.label}
            </label>
            <input placeholder={props.placeholder} className={props.className} onChange={props.onChange}/>
        </div>
    );
}

