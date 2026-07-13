import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import "./NewOrder.css"; // Importation du fichier CSS

function NewOrder() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar à gauche, Header en haut à droite */}
      <Header />
      <Sidebar role="client" />
      
      <div className="main-window">
        
        
        <main className="NewOrderContent">
          <form className="order-form">
            
            {/* 1. SECTION INFORMATION GENERALE */}
            <div className="section-full-width general-info">
              <div className="info-row">
                <h3>Information general</h3>
                <div className="inline-field">
                  <label htmlFor="type">type de livraison</label>
                  <select id="type">
                    <option value="" disabled selected>selectionner le type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="pharmacie">Pharmacie</option>
                    <option value="colis">Colis</option>
                    <option value="courses">Courses</option>
                  </select>
                </div>
                <button type="submit" className="btn-validate">valider</button>
              </div>
            </div>

            {/* 2. GRILLE DE COLONNES (Retrait vs Dépôt) */}
            <div className="form-grid-columns">
              
              {/* Colonne Gauche : Point de retrait */}
              <div className="grid-column">
                <div className="container-box">
                  <h3>Point de retrait</h3>
                  
                  <div className="form-group-row">
                    <label htmlFor="nomR">Nom du contact</label>
                    <input type="text" id="nomR" placeholder="saisir le nom"/>
                  </div>
                  
                  <div className="form-group-row">
                    <label htmlFor="adressR">adresse</label>
                    <textarea id="adressR" placeholder="saisir adresse"></textarea>
                  </div>
                  
                  <div className="form-group-row">
                    <label htmlFor="telephoneR">telephone</label>
                    <input type="tel" id="telephoneR" placeholder="06/07 ********"/>
                  </div>
                </div>

                {/* Section Détails placée sous le Point de Retrait */}
                <div className="container-box details-box">
                  <h3>details</h3>
                  <div className="form-group-row">
                    <label htmlFor="distance">Distance</label>
                    <input type="number" id="distance" placeholder="xx KM" />
                  </div>
                </div>
              </div>

              {/* Colonne Droite : Point de dépôt */}
              <div className="grid-column">
                <div className="container-box">
                  <h3>Point de dépôt</h3>
                  
                  <div className="form-group-row">
                    <label htmlFor="nomD">Nom du contact</label>
                    <input type="text" id="nomD" placeholder="saisir le nom"/>
                  </div>
                  
                  <div className="form-group-row">
                    <label htmlFor="adressD">adresse</label>
                    <textarea id="adressD" placeholder="saisir adresse"></textarea>
                  </div>
                  
                  <div className="form-group-row">
                    <label htmlFor="telephoneD">telephone</label>
                    <input type="tel" id="telephoneD" placeholder="06/07 ********"/>
                  </div>
                </div>

                {/* Section Informations placée sous le Point de Dépôt */}
                <div className="container-box details-box">
                  <div className="form-group-row alignment-fix">
                    <label htmlFor="informations">informations</label>
                    <textarea id="informations" placeholder="saisir des details pour le livreur"></textarea>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default NewOrder;