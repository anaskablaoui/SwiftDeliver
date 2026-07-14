import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import "./OrderHistory.css"; // N'oubliez pas d'importer le CSS
import axios from 'axios'
import { useEffect, useState } from "react";

function OrderHistory() {
  // Données fictives pour remplir le tableau comme sur l'image
  const [listOfLivreur, setListofLivreur] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/api/livreurs').then((response)=>{
      console.log(response.data);
      console.log(Array.isArray(response.data));
      
      setListofLivreur(response.data)
    })
  },)

  return (
    
    <div className="page-layout">
      <Header />
      <Sidebar role="client" />
      <div className="main-wrapper">
       
        
        <main className="orderHistory-content">
          {/* Section Filtrage */}
          <div className="filter-container">
            <div className="filter-group"> 
              <label>Nom de retrait</label>
              <input type="text" placeholder="retrait" className="filter-input" />
            </div>
            <div className="filter-group">
              <label>status</label>
              <select className="filter-select">
                <option>selectionner statut</option>
                <option>livree</option>
                <option>en cours</option>
              </select>
            </div>
          </div>

          {/* Section Tableau */}
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>livreur</th>
                  <th>email</th>
                  <th>telephone</th>
                  <th>Type vehicule</th>
                  <th>Nb livraison</th>
                  <th>statut</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {listOfLivreur.map((order, index) => (
                  
                  <tr key={index}>
                    <td>xxxx</td>
                    <td>{order.User.nom} {order.User.prenom}</td>
                    <td> {order.User.email} </td>
                    <td> {order.User.telephone} </td>
                    <td> {order.type_vehicule} </td>
                    <td> {order.total_livraison} </td>
                    <td> {order.statut} </td>
                  
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-edit">⚙️</button>
                        <button className="btn-action btn-view">👁️</button>
                        <button className="btn-action btn-delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Bouton Ajouter */}
            <div className="add-button-wrapper">
              <button className="btn-add">+ Ajouter</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderHistory;