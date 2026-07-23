import React from 'react';
import logo from '../../assets/Gemini_Generated_Image_rrpvi6rrpvi6rrpv.png';
import './Header.css'; // Importing the CSS file

function Header() {
    return (
        <header className="main-header">
            <button
                className="btn sidebar-toggle-btn d-lg-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#appSidebar"
                aria-controls="appSidebar"
                aria-label="Ouvrir le menu"
            >
                <svg viewBox="0 0 24 24" className="sidebar-toggle-icon">
                    <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                </svg>
            </button>
            <div className="app-header-logo-wrap">
                <img src={logo} alt="SwiftDelivery" className="header-logo" />
            </div>
        </header>
    );
}

export default Header;