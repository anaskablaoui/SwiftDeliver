import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import "./OrderHistory.css"; // N'oubliez pas d'importer le CSS
import api from '../../services/api'
import { useEffect,useState } from "react";
import Pagination from "../../components/Common/Pagination";

const ITEMS_PER_PAGE = 10;

function OrderHistory() {
  //fonction de suppression
  

  // Données fictives pour remplir le tableau comme sur l'image
const [listOfClient , setListOfClient] = useState([])
const [search, setSearch] = useState("")
const [status, setStatus] = useState("")
const [currentPage, setCurrentPage] = useState(1)

useEffect(() => {
  const timer = setTimeout(() => {
    api.get("/clients", {
      params: {
        search: search,
      }
    }).then((response)=>{
        setListOfClient(response.data)
        setCurrentPage(1);
      })
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

const paginatedClients = listOfClient.slice(
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
          <div className="filter-container d-flex flex-wrap gap-3 align-items-center">
            <div className="filter-group d-flex align-items-center gap-2">
              <label>Nom</label>
              <input
                type="text"
                placeholder="client"
                className="filter-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Section Tableau */}
          <div className="table-container table-responsive">
            <table className="table orders-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Client</th>
                  <th>email</th>
                  <th>telephone</th>
                  
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClients.map((order, index) => (
                  <tr key={index}>
                    <td className="td-photo">
                      <div className="avatar-circle">
                        {order.photo ? (
                          <img src={order.photo} alt="" className="avatar-photo-img" />
                        ) : (
                          <svg viewBox="0 0 24 24" className="table-avatar-icon">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                          </svg>
                        )}
                      </div>
                    </td>
                    <td>{order.nom} {order.prenom}</td>
                    <td>{order.email}</td>
                    <td className="price-cell">{order.telephone}</td>

                    <td className="td-actions">
                      <div className="d-flex flex-column align-items-center gap-2">

                        <a href={`/admin/client-details/${order.id}`}><button className="action-btn btn-view" title="Voir détails">
                          <svg viewBox="0 0 24 24" className="action-icon">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                          </svg>
                        </button></a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalItems={listOfClient.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderHistory;