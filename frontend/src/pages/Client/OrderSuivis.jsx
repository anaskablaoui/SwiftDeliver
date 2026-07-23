import React, { useRef,useState,useEffect } from "react";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import api from "../../services/api";
import L from 'leaflet'
import deliveryMan from "../../assets/deliveryMan.svg";
import pickupPoint from "../../assets/pickupPoint.svg";
import endPoint from "../../assets/endPoint.svg";
import "./OrderSuivis.css";

function OrderSuivis(){
    const [coordinate,setCoordinates]=useState({
        lagitude:null,
        longitude:null
      })
    const [address,setAddress]=useState("");
    const mapRef = useRef(null);

    
      useEffect(()=>{
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
            
            const watchId= navigator.geolocation.watchPosition(
      (position)=>{
        setCoordinates(position.coords)
        
        //move livreur marker 
        meMarker.setLatLng([position.coords.latitude,position.coords.longitude])

        // centralize the map 
        map.setView([position.coords.latitude,position.coords.longitude],16)
      },
      (error)=>{
        console.log(error)
      }
    )

    return ()=>{
      navigator.geolocation.clearWatch(watchId);
      map.remove();
    }
      },[])
    return(
    <div className="dashboard-layout">
        <Header/>
        <Sidebar role="client"/>

        <div className="main-window">
            <main className="order-suivi-page">
                <div className="order-suivi-map" ref={mapRef}></div>
            </main>
        </div>
    </div>
    )
}
export default OrderSuivis;