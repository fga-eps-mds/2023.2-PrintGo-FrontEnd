import React from "react";
import  "../style/pages/impressorasCadastradas.css";
import Search from '../assets/Search.svg';
import Filter from '../assets/Filter.svg';

export default function ImpressorasCadastradas(){
    return(
        <div className="impressorasCadastradas-page">
            <div className="impressorasCadastradas-text">
                Impressoras cadastradas
                <div className="impressorasCadastradas-image">
                  <img alt="" src={Search} />
                  <img alt="" src={Filter} />
                  
                </div>

                {/* <div className="impressorasCadastradas-image-Search">
                  <img alt="" src={Search} />
                </div>

                <div className="impressorasCadastradas-image-Filter">
                  <img alt="" src={Filter} />
                </div> */}

                <div className="impressorasCadastradas-left-content">
                    <div className="impressorasCadastradas-aligned-content">
                        <div className="impressorasCadastradas-page-text">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}