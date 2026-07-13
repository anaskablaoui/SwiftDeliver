import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";


function OrderHistory() {
  // Données fictives pour remplir le tableau comme sur l'image
  const orders = Array(5).fill({
    livraison: "livraison a",
    retrait: "retrait a",
    destinataire: "destinataire a",
    prix: "120.00 DHS",
    statut: "livree",
  });

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
                  <th>nom livraison</th>
                  <th>nom retrait</th>
                  <th>nom destinataire</th>
                  <th>prix</th>
                  <th>statut</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.livraison}</td>
                    <td>{order.retrait}</td>
                    <td>{order.destinataire}</td>
                    <td className="price-cell">{order.prix}</td>
                    <td>{order.statut}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-view">👁️</button>
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