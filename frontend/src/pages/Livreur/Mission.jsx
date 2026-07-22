import React from 'react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import './Mission.css';
import { useParams } from 'react-router-dom';
import {useEffect,useState,useRef} from 'react';
import api from '../../services/api';
import { Formik, Form, Field } from "formik";
import L from 'leaflet'
import deliveryMan from '../../assets/deliveryMan.svg'
import endPoint from '../../assets/endPoint.svg'
import pickupPoint from '../../assets/pickupPoint.svg'

function MissionDetail() {

    let {id} = useParams();

    const [Order,setListOfOrders]= useState({})
   useEffect(() => {
    api.get(`/commandes/${id}`)
        .then((response) => {
            console.log(response.data);
            console.log(Array.isArray(response.data));
            setListOfOrders(response.data);
        });
}, []);

  const onSubmit = (data) => {
    api.put(`/commandes/mission/${id}`, data).then((response)=>{
    console.log('it worked');
    window.location.reload();
  })
  };

  //Map code 
  const [coordinate,setCoordinates]=useState({
    lagitude:null,
    longitude:null
  })
  const [address,setAddress]=useState("");
  const mapRef = useRef(null);

useEffect(() => {


    const map = L.map(mapRef.current);


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors",
        }
    ).addTo(map);

    //marqueur de livreur
    const deliveryManIcon = L.icon({
      iconUrl:deliveryMan,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      
    })
    const meMarker = L.marker([0, 0],{
      icon:deliveryManIcon
    }).addTo(map);
    meMarker.bindPopup("Me");
    //marqueur de retrait 
    const pickupIcon = L.icon({
      iconUrl:pickupPoint,
      iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    })
    const pickupMarker = L.marker([0,0],{
      icon:pickupIcon
    }).addTo(map);
    pickupMarker.bindPopup("pickup")
    //marqueur de point de livraison
    const endPointIcon = L.icon({
      iconUrl:endPoint,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    })
    const deliveryMarker = L.marker([0,0],{
      icon:endPointIcon
    }).addTo(map);
    deliveryMarker.bindPopup("delivery")


map.on("click", async (e) => {

    const latitude = e.latlng.lat;
    const longitude = e.latlng.lng;


    setCoordinates({
        latitude,
        longitude
    });


    deliveryMarker.setLatLng(e.latlng);


    try {

        const response = await api.post(
            "/location/reverse",
            {
                latitude,
                longitude
            }
        );


        setAddress(response.data.address);


    } catch(error){

        console.log(error);

    }


});

    return () => {
        navigator.geolocation.clearWatch(watchId);
        map.remove();
    };

}, []);
    



  return (
    <div className="dashboard-layout">
      {/* Sidebar livreur active sur "mes livraison" */}
      <Sidebar role="livreur" activePage="mes-livraisons" />
      
      <div className="main-window">
        <Header />
        
        <main className="mission-content">
          <h2 className="mission-title">Mission</h2>
          
          <div className="mission-grid">
            
            {/* Conteneur de gauche : Emplacement de la Carte */}
            <div className="map-container-box">
              <div className="map-placeholder" ref={mapRef}
                  style={{
                  height: "500px",
                  width: "100%"
                }}>
                
              </div>
            </div>

            {/* Conteneur de droite : Détails & Formulaire de la mission */}
            <div className="details-card-box">
              <Formik initialValues={Order} onSubmit={onSubmit} enableReinitialize>
                <Form className="mission-form">

                  <div className="mission-form-group">
                    <label htmlFor="nom-retrait">nom retrait:</label>
                    <Field
                      type="text"
                      id="nom-retrait"
                      name="nom_retrait"
                      disabled
                      placeholder="Nom du retrait"
                    />
                  </div>
                
                  <div className="mission-form-group">
                    <label htmlFor="nom-destinataire">nom destinataire:</label>
                    <Field
                      type="text"
                      id="nom-destinataire"
                      name="nom_livraison"
                      disabled
                      placeholder="Nom du destinataire"
                    />
                  </div>

                  <div className="mission-form-group">
                    <label htmlFor="statut">statut</label>
                    <Field
                      type="text"
                      id="statut"
                      name="Statut"
                      disabled
                      placeholder="Statut actuel"
                    />
                  </div>

                  <div className="mission-form-group price-group">
                    <label htmlFor="prix">prix</label>
                    <Field
                      type="text"
                      id="prix"
                      name="prixLivraison"
                      disabled
                      placeholder="xx DHS"
                    />
                  </div>

                  <div className="mission-btn-container">
                    <button type="submit" className="btn-validate">valider</button>
                  </div>

                </Form>
              </Formik>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default MissionDetail;