import React from "react";
//import NavbarSimple from "../components/NavbarSimple"
import  "../style/pages/home.css";
import Button from "../components/Button";
import home_image from '../assets/home_image.svg';
import elipse from '../assets/home_elipse.svg';
import NavbarSimple from "../components/NavbarSimple";


export default function Home(){
    return(
    <div className="homepage">
        
          <NavbarSimple></NavbarSimple>
            <div className="content">

                <div className="left-content">
                    <div className="aligned-content">
                        <div className="page-text">
                            <b className="printgo">PrintGo</b>
                            <div className="home-text">
                                Contando impressões desde 2023
                            </div>
                        </div>
                        <div className="containter-button">
                            <div className="saiba-mais">
                                <Button
                                    textColor="#036"
                                    bgColor="white"
                                    borderColor="#036"
                                >
                                    Saiba mais
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="elipse">
                        <img alt="" src={elipse}></img>
                    </div>
                </div>
                <div className="right-content">
                    <img className="home-image" alt="" src={home_image} />
                </div>
            </div>
        </div>
        );
}