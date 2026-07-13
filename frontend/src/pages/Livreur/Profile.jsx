import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import './Profile.css'; // Importation du CSS

function Profile() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar & Header intégrés globalement */}
      <Header />
      <Sidebar role="client" />
      
      <div className="main-window">
        
        
        <main className="profile-content">
          
          {/* CARD SUPÉRIEURE : INFOS UTILISATEUR */}
          <div className="user-info-card">
            <div className="avatar-section">
              {/* Icône SVG Utilisateur en noir comme sur la maquette */}
              <svg viewBox="0 0 24 24" className="profile-avatar-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <div className="user-details">
                <h2>Nom Prenom</h2>
                <div className="user-sub-details">
                  <span className="user-email">nomPrenom@gmail.com</span>
                  <span className="user-phone">0600606060</span>
                </div>
              </div>
            </div>
            <div className="role-badge">
              role: <span className="role-name">client</span>
            </div>
          </div>

          {/* GRILLE INFÉRIEURE : LES DEUX FORMULAIRES */}
          <div className="profile-forms-grid">
            
            {/* FORMULAIRE GAUCHE : MOT DE PASSE */}
            <div className="profile-card-form">
              <h3>Changer le mots de passe</h3>
              <form>
                <div className="profile-form-group">
                  <label htmlFor="old-password">ancien mots de passe:</label>
                  <input type="password" id="old-password" />
                </div>
                
                <div className="profile-form-group">
                  <label htmlFor="new-password">nouveau mots de passe:</label>
                  <input type="password" id="new-password" />
                </div>
                
                <div className="profile-form-group">
                  <label htmlFor="confirm-password">confirmer mots de passe:</label>
                  <input type="password" id="confirm-password" />
                </div>
                
                <button type="submit" className="btn-save">valider</button>
              </form>
            </div>

            {/* FORMULAIRE DROITE : INFOS GÉNÉRALES */}
            <div className="profile-card-form">
              <h3>Modifier les informations</h3>
              <form>
                <div className="profile-form-group">
                  <label htmlFor="edit-phone">telephone</label>
                  <input type="tel" id="edit-phone" />
                </div>
                
                <div className="profile-form-group">
                  <label htmlFor="edit-email">email</label>
                  <input type="email" id="edit-email" />
                </div>
                
                <div className="profile-form-group">
                  <label>photo</label>
                  <label htmlFor="file-upload" className="custom-file-upload">
                    import img
                  </label>
                  <input type="file" id="file-upload" style={{ display: 'none' }} />
                </div>
                
                <button type="submit" className="btn-save">valider</button>
              </form>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;