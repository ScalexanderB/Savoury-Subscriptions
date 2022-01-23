import React from "react";
import '../../pages/style.css';

function Header(){
    return(
        <header>
            <div className='p-5 text-center bg-image' style={{ backgroundImage: "url('https://mdbootstrap.com/img/Photos/Horizontal/Food/full%20page/9.jpg')", height: 600 }}>
              <div className="maskbox">
                <div className="mask opacity-1">
                    Savour the flavour.
                    <p></p>
                    And your bank account.
                </div>
              </div>
            </div>
            
        </header>
    )
};

export default Header;