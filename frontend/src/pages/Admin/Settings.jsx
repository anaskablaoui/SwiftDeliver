import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import './Settings.css'; // Importation du CSS

function SystemConfig() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar configurée pour l'admin */}
      <Sidebar role="admin" />
      
      <div className="main-window">
        <Header />
        
        <main className="config-content">
          <div className="config-card">
            <h2>Configuration systeme</h2>
            
            <form>
              <div className="config-form-group">
                <label htmlFor="base-tariff">tarif de base</label>
                <input type="text" id="base-tariff" placeholder="xx DHS" />
              </div>
              
              <div className="config-form-group">
                <label htmlFor="km-tariff">tarif par km</label>
                <input type="text" id="km-tariff" placeholder="xx DHS" />
              </div>
              
              <div className="config-btn-container">
                <button type="submit" className="btn-validate">valider</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SystemConfig;