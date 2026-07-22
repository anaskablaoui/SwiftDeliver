import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import './offreMission.css';
import api from '../../services/api';
import { useState } from 'react';
import { useEffect } from 'react';

function MissionOffers() {
  // Exemple de données basé sur votre capture d'écran
  const [offers,setOffer] = useState([])

  useEffect(()=>{
    api.get("/mission").then((response)=>{
      console.log('test');
      console.log(response.data);
      console.log(Array.isArray(response.data));
      setOffer(response.data);
    });
  },[])


  const handleAccept = (id) => {
    api.patch(`/mission/${id}/validate`, {}).then(() => {
      setOffer((prev) => prev.filter((offer) => offer.id !== id));
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleDelete = (id) => {
    api.delete(`/mission/${id}/refuse`).then(() => {
      setOffer((prev) => prev.filter((offer) => offer.id !== id));
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="livreur" />
      
      <div className="main-window">
        <Header />
        
        <main className="offers-content">
          <h1 className="offers-title">Offres de mission</h1>
          <div className="offers-grid">
            {offers.map((offer) => (
              <div key={offer.id} className="offer-card">
                
                <div className="card-body">
                  <p className="offer-date">date: {offer.commande.created_at}</p>
                  <h3 className="offer-name">{offer.commande.nom_livraison}</h3>
                  <p className="offer-detail">prix: {offer.commande.prix}</p>
                  <p className="offer-detail">pourcentage: {offer.commande.distanceKM}</p>
                </div>

                <div className="card-actions">
                  <button
                    onClick={() => handleAccept(offer.id)}
                    className="offer-btn offer-btn-accept"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => handleDelete(offer.id)}
                    className="offer-btn offer-btn-delete"
                  >
                    Supprimer
                  </button>
                </div>

              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MissionOffers;