import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import "../Admin/OrderHistory.css";
import api from '../../services/api';
import { useEffect, useState} from "react";
import Pagination from "../../components/Common/Pagination";

const ITEMS_PER_PAGE = 10;

function OrderHistory() {
  // Données fictives pour remplir le tableau comme sur l'image
  const [search,setSearch] = useState("");
  const [status,setStatus] = useState("");
  const [listOfOrders,setListOfOrders]= useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 useEffect(() => {

    const timer = setTimeout(() => {

        api.get("/commandes", {
            params: {
                search: search,
                status: status
            }
        }).then((response) => {
            console.log(response.data);
            console.log(Array.isArray(response.data));
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
      <Sidebar role="livreur" />
      <div className="main-wrapper">
       
        
        <main className="orderHistory-content">
          {/* Section Filtrage */}
          <div className="filter-container d-flex flex-wrap gap-3 align-items-center">
            <div className="filter-group d-flex align-items-center gap-2">
              <label>Nom de retrait</label>
              <input
                type="text"
                placeholder="retrait"
                className="filter-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
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
                  <th>Type livraison</th>
                  <th>nom retrait</th>
                  <th>nom destinataire</th>
                  <th>prix</th>
                  <th>statut</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.type_commande}</td>
                    <td>{order.nom_retrait}</td>
                    <td>{order.nom_livraison}</td>
                    <td className="price-cell">{order.prixLivraison}</td>
                    <td>{order.Statut}</td>
                    <td className="td-actions">
                      <div className="d-flex flex-column align-items-center gap-2">
                        <a href={`/livreur/delivery/${order.id}`}>
                          <button className="action-btn btn-view" title="Voir détails">
                            <svg viewBox="0 0 24 24" className="action-icon">
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                          </button>
                        </a>
                        <a href={`/livreur/Mission/${order.id}`}>
                          <button className="action-btn btn-start" title="Démarrer la mission">
                            <svg viewBox="0 0 24 24" className="action-icon">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </button>
                        </a>
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
              <button className="btn-add">+ Ajouter</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderHistory;