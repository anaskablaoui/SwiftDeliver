import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import axios from 'axios';
import { useEffect, useState} from "react";

function OrderHistory() {
  // Données fictives pour remplir le tableau comme sur l'image
  const [search,setSearch] = useState("");
  const [status,setStatus] = useState("");
  const [listOfOrders,setListOfOrders]= useState([]);
  console.log(sessionStorage.getItem("accesstoken"));
 useEffect(() => {

    const timer = setTimeout(() => {

        axios.get("http://localhost:3000/api/commandes", {
            params: {
                search: search,
                status: status
            },
            headers:{
                accessToken:sessionStorage.getItem('accesstoken')
            }
        }).then((response) => {
            console.log(response.data);
            console.log(Array.isArray(response.data));
            setListOfOrders(response.data);
        });

    }, 500);

    return () => clearTimeout(timer);

}, [search, status]);


  return (
    
    <div className="page-layout">
      <Header />
      <Sidebar role="livreur" />
      <div className="main-wrapper">
       
        
        <main className="orderHistory-content">
          {/* Section Filtrage */}
          <div className="filter-container">
            <div className="filter-group">
              <label>Nom de retrait</label>
              <input
                type="text"
                placeholder="retrait"
                className="filter-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>status</label>
              <select className="filter-select"
              value={status}
              onChange={(e)=>setStatus(e.target.value)}>
                <option value="">selectionner statut</option>
                <option value="en_attente">en_attente</option>
                <option value="assignee">assignee</option>
                <option value="en_retrait">en_retrait</option>
                <option value="recuperee">recuperee</option>
                <option value="livree">livree</option>
                <option value="annulee">annulee</option>
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