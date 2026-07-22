import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';
import './Dashboard.css'; // Importation du CSS
import api from '../../services/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function Dashboard() {
  const [listOfstats, setListOfStats] = useState({
    todayMissions: 0,
    totalMission: 0,
    totalGains: 0
  })
  const [chartData, setChartData] = useState({ labels: [], data: [] })

  useEffect(()=>{
    api.get("/stats/dashboard").then((response)=>{
      setListOfStats(response.data.stats)
    })

    api.get("/stats/gains-par-mois").then((response)=>{
      setChartData(response.data)
    })
  }, [])

  const lineChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Gains par mois (DHS)',
        data: chartData.data,
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.15)',
        tension: 0.3,
        fill: true
      }
    ]
  }

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
              <h4>Missions d'aujourd'hui</h4>
              <span className="stat-number">{listOfstats.todayMissions}</span>
            </div>

            <div className="stat-card">
              <h4>Total gains de moi</h4> {/* Fidèle à l'orthographe de la maquette */}
              <span className="stat-number green-text">{listOfstats.totalGains} DHS</span>
            </div>

            <div className="stat-card">
              <h4>Total mission</h4>
              <span className="stat-number">{listOfstats.totalMission}</span>
            </div>
          </div>

          {/* Zone inférieure : Le graphique */}
          <div className="chart-container-box">
            <p className="chart-placeholder">Gains des 12 derniers mois</p>
            <div className="dummy-chart-space">
              <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
