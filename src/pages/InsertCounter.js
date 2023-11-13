import "../style/pages/insertCounter.css";
import ellipse_image from "../assets/login_ellipse.svg";
import React from "react";
import CounterForm from "../components/forms/CounterForm";
import Navbar from "../components/navbar/Navbar";

export default function InsertCounter() {
  return (
    <>
      <Navbar />
      <div id="insert-counter-container">
        <CounterForm />
      </div>
      <div id="ellipse-insert-counter">
        <img alt="ellipse_image" src={ellipse_image}/>
      </div>
    </>
  );
}