import React from 'react';
import logo from '../../assets/Gemini_Generated_Image_rrpvi6rrpvi6rrpv.png';
import './Register.css'; // Importation du CSS

function Register() {
  return (
    <div className="registerPage">
      <div className="registerCard">
        {/* En-tête : Logo + Titre */}
        <div className="logo-container">
          <img src={logo} alt="SwiftDelivery" className="register-logo" />
          <h2>Insription</h2> {/* Orthographe fidèle à votre maquette */}
        </div>

        <form>
          {/* Conteneur des deux colonnes */}
          <div className="form-columns">
            {/* Colonne Gauche */}
            <div className="form1-side">
              <div className="form-group">
                <label htmlFor="Nom">Nom :</label>
                <input type="text" id="Nom" placeholder="Entrez votre nom" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" placeholder="Entrez votre email" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" placeholder="Entrez le mots de passe" />
              </div>
            </div>

            {/* Colonne Droite */}
            <div className="form2-side">
              <div className="form-group">
                <label htmlFor="Prenom">Prenom :</label>
                <input type="text" id="Prenom" placeholder="Entrez votre prenom" />
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Telephone :</label>
                <input type="tel" id="telephone" placeholder="Entrez votre telephone" />
              </div>

              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirmer mots de passe :</label>
                <input type="password" id="passwordConfirm" placeholder="Confirmez mots de passe" />
              </div>
            </div>
          </div>

          {/* Bouton centré en bas */}
          <button type="submit" id="inscrire">s'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Register;