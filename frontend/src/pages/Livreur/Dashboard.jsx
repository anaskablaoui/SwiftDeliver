import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import './Dashboard.css'; // Importation du CSS

function Dashboard() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar dédiée au livreur */}
       <Header />
      <Sidebar role="livreur" />
      
      <div className="main-window">
       
        
        <main className="dashboardContent">
          
          {/* Rangée supérieure : Les 3 cartes de statistiques */}
          <div className="stats-row">
            <div className="stat-card">
              <h4>Missions d’aujourd’hui</h4>
              <span className="stat-number">20</span>
            </div>
            
            <div className="stat-card">
              <h4>Total gains de moi</h4> {/* Fidèle à l'orthographe de la maquette */}
              <span className="stat-number green-text">20 DHS</span>
            </div>
            
            <div className="stat-card">
              <h4>Total mission</h4>
              <span className="stat-number">20</span>
            </div>
          </div>

          {/* Zone inférieure : Le graphique */}
          <div className="chart-container-box">
            {/* C'est ici que viendra s'insérer votre composant <Line data={...} /> de Chart.js */}
            <p className="chart-placeholder">Chart.js Line Chart</p>
            <div className="dummy-chart-space">
              {/* Simulation visuelle ou intégration future de votre graphique */}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;