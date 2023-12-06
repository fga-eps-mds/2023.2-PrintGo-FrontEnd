import React from "react";
import "../style/pages/home.css";
import Button from "../components/Button";
import home_image from "../assets/home_image.svg";
import elipse from "../assets/home_elipse.svg";
import Navbar from "../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="homepage">
        <div className="content-home">
          <div className="left-content-home">
            <div className="aligned-content">
              <div className="page-text-home">
                <b className="printgo-logo">PrintGo</b>
                <div className="home-text">Contando impressões desde 2023</div>
              </div>
              <div className="containter-button-home">
                <div className="learn-more">
                  <Link to="/quemsomos" className="button-saiba-mais">
                    <button>
                      Saiba Mais
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="elipse-home">
              <img alt="" src={elipse}></img>
            </div>
          </div>
          <div className="right-content-home">
            <img className="home-image" alt="" src={home_image} />
          </div>
        </div>
      </div>
    </>
  );
}
