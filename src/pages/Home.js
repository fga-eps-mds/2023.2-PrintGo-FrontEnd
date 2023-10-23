import React from "react";
import  "../style/pages/home.css";
import Button from "../components/Button";
import home_image from '../assets/home_image.svg';
import elipse from '../assets/home_elipse.svg';




export default function Home(){
    return(
    <div className="homepage">
        <div className="content-home">
                <div className="left-content-home">
                    <div className="aligned-content">
                        <div className="page-text-home">
                            <b className="printgo-logo">PrintGo</b>
                            <div className="home-text">
                                Contando impressões desde 2023
                            </div>
                        </div>
                        <div className="containter-button-home">
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
                    <div className="elipse-home">
                        <img alt="" src={elipse}></img>
                    </div>
                </div>
                <div className="right-content-home">
                    <img className="home-image" alt="" src={home_image} />
                </div>
            </div>

        </div>
    );
}