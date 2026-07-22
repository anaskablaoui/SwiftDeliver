import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import "./OrderHistory.css"; // N'oubliez pas d'importer le CSS
import api from '../../services/api';
import { useEffect, useState } from "react";
import Pagination from "../../components/Common/Pagination";

const ITEMS_PER_PAGE = 10;



function Order() {
  //fonction de suppression
  const deleting = (id)=>{
      api.delete(`/commandes/${id}`).then((response)=>{
        console.log('it worked');
        window.location.reload();
      })
  };

  // Données fictives pour remplir le tableau comme sur l'image
  const [search,setSearch] = useState("")
  const [status,setStatus] = useState("")
  const [listOfOrders,setListOfOrders]= useState([])
  const [currentPage, setCurrentPage] = useState(1)
useEffect(() => {

    const timer = setTimeout(() => {

        api.get("/commandes", {
            params: {
                client: search,
                status: status
            }
        }).then((response) => {
            setListOfOrders(response.data);
            setCurrentPage(1);
        });

    }, 500);

    return () => clearTimeout(timer);

}, [search, status]);

const paginatedOrders = listOfOrders.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

  return (
    
    <div className="page-layout">
      <Header />
      <Sidebar role="admin" />
      <div className="main-wrapper">
       
        
        <main className="orderHistory-content">
          {/* Section Filtrage */}
          <div className="filter-container">
            <div className="filter-group">
              <label>Nom de retrait</label>
              <input
                type="text"
                placeholder="Recherche"
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
                {paginatedOrders.map((order, index) => (
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
                        <button className="btn-action btn-delete" onClick={() => deleting(order.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalItems={listOfOrders.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />

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