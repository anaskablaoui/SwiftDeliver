import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import api from "../../services/api";
import "./modalMap.css";

function MapModal({ isOpen, onClose, onConfirm }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setAddress("");
    setCoordinates(null);

    const map = L.map(mapContainerRef.current).setView([33.5731, -7.5898], 12);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    map.on("click", async (e) => {
      const { lat, lng } = e.latlng;
      setCoordinates({ latitude: lat, longitude: lng });

      if (markerRef.current) {
        markerRef.current.setLatLng(e.latlng);
      } else {
        markerRef.current = L.marker(e.latlng).addTo(map);
      }

      setLoading(true);
      try {
        const response = await api.post("location/reverse", {
          latitude: lat,
          longitude: lng,
        });
        setAddress(response.data.display_name || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!coordinates) return;
    onConfirm({ address, ...coordinates });
    onClose();
  };

  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal" onClick={(e) => e.stopPropagation()}>
        <div className="map-modal-header">
          <h2>Choisir un emplacement</h2>
          <button type="button" className="map-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="map-modal-map" ref={mapContainerRef}></div>

        <div className="map-modal-footer">
          <p className="map-modal-address">
            {loading
              ? "Recherche de l'adresse..."
              : address || "Cliquez sur la carte pour choisir un point"}
          </p>
          <div className="map-modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button
              type="button"
              className="btn-validate"
              disabled={!coordinates}
              onClick={handleConfirm}
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapModal;
