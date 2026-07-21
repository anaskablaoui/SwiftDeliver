import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import './Livreur.css';
import axios from 'axios';
import { useEffect, useState } from "react";

function LivreurManagement() {

  const submiting = (data)=>{
    axios.put('http://localhost:3000/api/commandes',data,{
      headers:{
        accessToken:sessionStorage.getItem('accesstoken')
      }
    }).then((response)=>{
      console.log('it worked')
      window.location.reload();
    })
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Exemple de données fictives basées sur votre maquette
  const [listOfLivreur,setListOfLivreur] = useState([])

  const deleting = (id) => {
    axios.delete(`http://localhost:3000/api/livreurs/${id}`, {
      headers: {
        accessToken: sessionStorage.getItem('accesstoken')
      }
    }).then(() => {
      window.location.reload();
    }).catch((error) => {
      console.error('Erreur lors de la suppression du livreur :', error);
    });
  };

  useEffect(()=>{
    const timer = setTimeout(() => {
      axios.get("http://localhost:3000/api/livreurs",{
        params: {
          search: searchTerm,
          status: statusFilter
        },
        headers:{
          accessToken:sessionStorage.getItem('accesstoken')
        }
      }) . then((response) =>{
        console.log(response.data)
        setListOfLivreur(response.data)
      })
    }, 500);

    return () => clearTimeout(timer);
  },[searchTerm, statusFilter])
  return (
    <div className="dashboard-layout">
      {/* Barre latérale pour l'admin */}
      <Sidebar role="admin" />
      
      <div className="main-window">
        <Header />
        
        <main className="livreur-content">
          
          {/* BARRE DE FILTRE SUPÉRIEURE */}
          <div className="filter-card">
            <div className="filter-group">
              <label htmlFor="search-livreur">Nom de livreur</label>
              <input 
                type="text" 
                id="search-livreur" 
                placeholder="livreur"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <label htmlFor="status-filter">status</label>
              <select 
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">selectionner statut</option>
                <option value="disponible">disponible</option>
                <option value="occupe">occupe</option>
                <option value="inactif">inactif</option>
              </select>
            </div>
          </div>

          {/* SECTION TABLEAU */}
          <div className="table-container">
            <table className="livreur-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>livreur</th>
                  <th>email</th>
                  <th>telephone</th>
                  <th>type vehicule</th>
                  <th>nb livraison</th>
                  <th>statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listOfLivreur.map((livreur) => (
                  <tr key={livreur.id}>
                    {/* Colonne Photo avec l'icône de profil noire */}
                    <td className="td-photo">
                      <div className="avatar-circle">
                        <svg viewBox="0 0 24 24" className="table-avatar-icon">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                      </div>
                    </td>
                    <td>{livreur.User.nom} {livreur.User.prenom} </td>
                    <td>{livreur.User.email}</td>
                    <td>{livreur.User.telephone}</td>
                    <td>{livreur.type_vehicule}</td>
                    <td> {livreur.total_livraison} </td>
                    <td>{livreur.statut}</td>
                    
                    {/* Colonne Actions contenant les 3 boutons */}
                    <td className="td-actions">
                      <div className="action-buttons-group">
                        {/* Bouton Supprimer (Rouge avec X blanc) */}
                        <button className="action-btn btn-delete" title="Supprimer" onClick={() => deleting(livreur.id)}>
                          <svg viewBox="0 0 24 24" className="action-icon">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                          </svg>
                        </button>
                        
                        {/* Bouton Détails / Vue (Gris foncé avec Oeil blanc) */}
                        <button className="action-btn btn-view" title="Voir détails">
                          <svg viewBox="0 0 24 24" className="action-icon">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                          </svg>
                        </button>
                        
                        {/* Bouton Configurer (Orange avec curseurs d'options) */}
                        <button className="action-btn btn-settings" title="Modifier">
                          <svg viewBox="0 0 24 24" className="action-icon">
                            <path d="M3 17v2h6v-2H3zm0-8v2h10V9H3zm10 10v-2h8v-2h-8v-2h-2v6h2zM7 5v2H3v2h4v2h2V5H7zm14 4V7h-8v2h8z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOUTON D'AJOUT EN BAS À DROITE */}
          <div className="add-button-container">
            <a href=""><button className="btn-add-livreur">+Ajouter</button></a>
          </div>

        </main>
      </div>
    </div>
  );
}

export default LivreurManagement;