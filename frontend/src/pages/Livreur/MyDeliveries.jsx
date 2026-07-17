import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import axios from 'axios';
import { useEffect, useState} from "react";
function OrderHistory() {
  // Données fictives pour remplir le tableau comme sur l'image
  const [listOfOrders,setListOfOrders]= useState([])
  console.log(sessionStorage.getItem("accesstoken"))
 useEffect(() => {
    axios.get("http://localhost:3000/api/commandes",
        {
          headers:{
            accessToken:sessionStorage.getItem('accesstoken')
          }
        })
        .then((response) => {
            console.log(response.data);
            console.log(Array.isArray(response.data));
            setListOfOrders(response.data);
        }
      );
}, []);


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
                  <th>Type livraison</th>
                  <th>nom retrait</th>
                  <th>nom destinataire</th>
                  <th>prix</th>
                  <th>statut</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {listOfOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.type_commande}</td>
                    <td>{order.nom_retrait}</td>
                    <td>{order.nom_livraison}</td>
                    <td className="price-cell">{order.prixLivraison}</td>
                    <td>{order.Statut}</td>
                    <td>
                      <div className="action-buttons">
                        <a href={`/livreur/delivery/${order.id}`}><button className="btn-action btn-view">👁️</button></a>
                        <a href={`/livreur/Mission/${order.id}`}><button className="btn-action btn-start" title="Démarrer la mission">▶️</button></a>
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