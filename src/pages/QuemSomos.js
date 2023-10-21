import React, { useState } from 'react';
import '../style/pages/quemSomos.css';
import pessoasDois from '../assets/pessoasDois.svg';
import PoliciaCivilLogo from '../assets/PoliciaCivilLogo.svg';

function QuemSomos() {

  return (
    <div className="container">
      <div className="ellipse"></div>
      <div className="texto">
        <h2>Quem Somos</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquet elementum eros. Suspendisse gravida velit id vulputate laoreet. Integer ultrices, nulla at aliquam lacinia, metus ligula dapibus metus, eget ornare turpis sapien vitae lorem. Cras sed lorem nec justo pharetra commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae erat sed felis auctor feugiat. Proin justo lorem, condimentum nec venenatis nec, malesuada vitae ex. Mauris mattis, diam vitae dictum pellentesque, lectus massa interdum augue, ut dictum ligula massa id nibh. Maecenas auctor elit non augue condimentum suscipit. Integer non luctus augue, nec tristique nunc. Integer ut commodo mi, vitae tincidunt neque.
        </p>
        <p>
          Quisque non posuere eros, vel posuere purus. Donec vehicula est eu magna fermentum congue. Nam in mollis nisi, a congue augue. Proin vulputate laoreet ex nec interdum. Aliquam ullamcorper malesuada sem, eget eleifend ex ultrices sed. Donec elementum, turpis sit amet auctor elementum, urna erat tempus ex, fringilla elementum elit massa a arcu. Aliquam lobortis ultricies iaculis.
        </p>
      </div>
      
      <div className="logo">
       <img src={PoliciaCivilLogo} alt="PoliciaCivilLogo" className="PoliciaCivilLogo" /> 
      </div>

      <div>
        <img src={pessoasDois} alt="PessoasDois" className="pessoasDois" />
      </div>




    </div>
  );
}

export default QuemSomos;
