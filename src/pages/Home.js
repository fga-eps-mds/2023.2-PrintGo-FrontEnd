import React from "react";
import "../style/pages/home.css";
import Button from "../components/Button";
import home_image from "../assets/home_image.svg";
import elipse from "../assets/home_elipse.svg";
import NavbarSimple from "../components/navbar/NavbarSimple";

export default function Home() {
  return (
    <>
      <NavbarSimple />
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
                  <Button textColor="#036" bgColor="white" borderColor="#036">
                    <a id="saibamais" href="/quemsomos">Saiba mais</a>
                  </Button>
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
