import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import "./OrderHistory.css"; // N'oubliez pas d'importer le CSS
import axios from 'axios';
import { useEffect, useState } from "react";

function Order() {
  // Données fictives pour remplir le tableau comme sur l'image
  const [listOfOrders,setListOfOrders]= useState([])

 useEffect(() => {
    axios.get("http://localhost:3000/api/commandes")
        .then((response) => {
            console.log(response.data);
            console.log(Array.isArray(response.data));
            setListOfOrders(response.data);
        });
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
                  <th>num</th>
                  <th>client</th>
                  <th>livreur</th>
                  <th>type</th>
                  <th>statut</th>
                  <th>Prix</th>
                  <th>Date</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {listOfOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.client.nom} {order.client.prenom}</td>
                    <td> {order.livreur? `${order.livreur.User.nom} ${order.livreur.User.prenom}` : "non assigne"}  </td>
                    <td className="price-cell">{order.type_commande}</td>
                    <td>{order.Statut}</td>
                    <td> {order.prixLivraison} </td>
                    <td> {order.created_at} </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-edit">⚙️</button>
                        <a href={`/admin/order/${order.id}`}><button className="btn-action btn-view">👁️</button></a>
                        <button className="btn-action btn-delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Bouton Ajouter */}
            <div className="add-button-wrapper">
              <a href="/admin/new-order"><button className="btn-add">+ Ajouter</button></a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Order;