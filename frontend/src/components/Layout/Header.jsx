import React from 'react';
import logo from '../../assets/Gemini_Generated_Image_rrpvi6rrpvi6rrpv.png';
import './Header.css'; // Importing the CSS file

function Header() {
    return (
        <header className="main-header">
            <div className="logo-container">
                <img src={logo} alt="SwiftDelivery" className="header-logo" />
            </div>
        </header>
    );
}

export default Header;