import Sidebar from '../../components/Layout/Sidebar'
import Header from '../../components/Layout/Header'
import Stepper from '../../components/Layout/stepper'
import { useEffect, useState} from "react";
import api from '../../services/api'
import './Dashboard.css'

function ClientDashboard(){

  
  {/*test variable */}
  const steps = ['en attente', 'assigne au livreur', 'en cours de retrait', 'en livraison', 'livree'];

  const [dashboard, setDashboard] = useState({
    stats: {},
    deliveries: [],
});

console.log(dashboard.stats)
console.log(dashboard.deliveries)

useEffect(() => {

    api
        .get("/stats/dashboard")
        .then((response) => {
            setDashboard(response.data);
        });

}, []);
  return(
    <div className="dashboard-layout">
      <Header/>
      <Sidebar role="client"/>

      <div className="main-window">
        <main className="dashboard-page">
          {/* Rangée supérieure : Les 3 cartes de statistiques */}
          <div className="stats-row">
            <div className="stat-card">
              <h4>commande live</h4>
              <span className="stat-number">{dashboard.stats.totalCommande}</span>
            </div>

            <div className="stat-card">
              <h4>commande en cours</h4>
              <span className="stat-number">{dashboard.stats.commandeEnCours}</span>
            </div>

            <div className="stat-card">
              <h4>commande annule</h4>
              <span className="stat-number">{dashboard.stats.commandeAnnule}</span>
            </div>
          </div>

          {/* Carte de progression des livraisons */}
          <div className="chart-container-box">
            <p className="chart-placeholder">livraison en cours</p>
            {dashboard.deliveries.map((d) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', width: '100%' }}>
                <a href={`/client/order-suivi/${d.id}`}><div style={{ width: '120px', fontWeight: 'bold' }}>{d.name}</div></a>
                <div style={{ flex: 1 }}>
                  <Stepper steps={steps} currentStep={d.currentStep} color={d.color} />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ClientDashboard
