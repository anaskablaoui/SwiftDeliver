import Sidebar from '../../components/Layout/Sidebar'
import Header from '../../components/Layout/Header'
import Stepper from '../../components/Layout/stepper'
import { useEffect, useState} from "react";
import axios from 'axios'
import './Dashboard.css'

function ClientDashboard(){

  
  {/*test variable */}
  const steps = ['en attente', 'assigne au livreur', 'en cours de retrait', 'en livraison', 'livree'];
   const deliveries = [
    { name: 'livraison a', currentStep: 4, color: '#22c55e' }, // all done -> green
    { name: 'livraison b', currentStep: 2, color: '#f59e0b' }, // stopped at "en cours de retrait"
    { name: 'livraison c', currentStep: 3, color: '#d946ef' }, // stopped at "en livraison"
  ];

  const [dashboard, setDashboard] = useState({
    stats: {},
    deliveries: [],
});

useEffect(() => {

    axios
        .get("http://localhost:3000/api/stats/dashboard", {
            headers: {
                accesstoken: sessionStorage.getItem("accesstoken"),
            },
        })
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
          {/* this is statistique  */}
          <div className="container">
              <div>
                <h3>commande live</h3>
                  <h2 className="live"> {dashboard.stats.totalCommande} </h2>
              </div>
              <div>
                <h3>commande en cours</h3>
                <h2 className="cours">{dashboard.stats.commandeEnCours}</h2>
              </div>
              <div>
                <h3>commande annule</h3>
                <h2 className="annule">{dashboard.stats.commandeAnnule}</h2>
              </div>
          </div>
          {/* this is delivery stats*/}
          <div className="container">
            <h2>livraison en cours</h2>
          {dashboard.deliveries.map((d) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ width: '120px', fontWeight: 'bold' }}>{d.name}</div>
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
