import React from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import "./OrderHistory.css"; // N'oubliez pas d'importer le CSS
import axios from 'axios'
import { useEffect,useState } from "react";
function OrderHistory() {
  //fonction de suppression
  

  // Données fictives pour remplir le tableau comme sur l'image
const [listOfClient , setListOfClient] = useState([])

useState(()=>{
  axios.get("http://localhost:3000/api/clients",
  {
    headers:{
      accesstoken:sessionStorage.getItem("accesstoken")
    }
  }).then((response)=>{
      setListOfClient(response.data)
    })
})

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
                  <th>Client</th>
                  <th>email</th>
                  <th>telephone</th>
                  
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {listOfClient.map((order, index) => (
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

            
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderHistory;