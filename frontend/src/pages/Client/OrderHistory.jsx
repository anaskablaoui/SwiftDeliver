import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import "./OrderHistory.css"; // N'oubliez pas d'importer le CSS
import api from '../../services/api'
import { useEffect, useState} from "react";
import Pagination from "../../components/Common/Pagination";

const ITEMS_PER_PAGE = 10;

function OrderHistory() {
  // Données fictives pour remplir le tableau comme sur l'image
  const [search,setSearch] = useState("")
  const [status,setStatus] = useState("")
  const [listOfOrders,setListOfOrders]= useState([])
  const [currentPage, setCurrentPage] = useState(1)
  
useEffect(() => {

    const timer = setTimeout(() => {

        api.get("/commandes", {
            params: {
                search: search,
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
      <Sidebar role="client" />
      <div className="main-wrapper">
       
        
        <main className="orderHistory-content">
          {/* Section Filtrage */}
          <div className="filter-container d-flex flex-wrap gap-3 align-items-center">
            <div className="filter-group d-flex align-items-center gap-2">
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
          <div className="table-container table-responsive">
            <table className="table orders-table">
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
                    <td className="td-actions">
                      <div className="d-flex flex-column align-items-center gap-2">
                        <a href={`/client/order/${order.id}`}>
                          <button className="action-btn btn-edit" title="Modifier">
                            <svg viewBox="0 0 24 24" className="action-icon">
                              <path d="M3 17v2h6v-2H3zm0-8v2h10V9H3zm10 10v-2h8v-2h-8v-2h-2v6h2zM7 5v2H3v2h4v2h2V5H7zm14 4V7h-8v2h8z"/>
                            </svg>
                          </button>
                        </a>
                        <a href={`/client/order/${order.id}`}>
                          <button className="action-btn btn-view" title="Voir détails">
                            <svg viewBox="0 0 24 24" className="action-icon">
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                          </button>
                        </a>
                        <button className="action-btn btn-delete" title="Supprimer" onClick={()=>{
                          api.delete(`commandes/${order.id}`);
                          window.location.reload()
                        }}>
                          <svg viewBox="0 0 24 24" className="action-icon">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                          </svg>
                        </button>
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
              <a href="/client/new-order"><button className="btn-add">+ Ajouter</button></a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderHistory;