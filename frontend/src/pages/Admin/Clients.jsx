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
          <div className="filter-container">
            <div className="filter-group">
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
          <div className="table-container">
            <table className="orders-table">
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
                    <td><img src={order.photo} alt="" /></td>
                    <td>{order.nom} {order.prenom}</td>
                    <td>{order.email}</td>
                    <td className="price-cell">{order.telephone}</td>
                    
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-edit">⚙️</button>
                        <button className="btn-action btn-view">👁️</button>
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