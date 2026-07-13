import React from 'react';
import loginImg from '../../assets/E-commerce.jpeg';
import logo from '../../assets/Gemini_Generated_Image_rrpvi6rrpvi6rrpv.png';
import './Login.css'; // Importation du fichier CSS

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        {/* Côté Gauche - Image */}
        <div className="login-image-side">
          <img src={loginImg} alt="Shopping Cart Glow" />
        </div>

        {/* Côté Droit - Formulaire */}
        <div className="login-form-side">
          <div className="logo-container">
            <img src={logo} alt="SwiftDelivery" className="login-logo" />
          </div>
          
          <h2>Connexion</h2>
          
          <form>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input type="email" id="email" placeholder="Entrez votre email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mots de passe :</label>
              <input type="password" id="password" placeholder="Entrez votre mot de passe" />
            </div>

            <button type="submit" className="btn-login">Log In</button>
          </form>

          <p className="signup-text">
            vous n’avez pas de compte ? <a href="/signup">sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;