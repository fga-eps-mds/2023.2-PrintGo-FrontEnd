import "../style/pages/insertCounter.css";
import React from "react";
import CounterForm from "../components/forms/CounterForm";
import Navbar from "../components/navbar/Navbar";

export default function CreateUserPage() {
  return (
    <>
      <Navbar />
      <div id="form-container">
        <CounterForm />
      </div>
    </>
  );
}