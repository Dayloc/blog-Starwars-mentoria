import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { getSpecificVehicle } from "../services/Fetch";
import FavoriteButton from "./FavoriteBuuton";

function VehicleSpecific() {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();

  const { specificVehicle, loading, error } = store;
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchVehicle = async () => {
      try {
        if (id && isMounted) {
          await getSpecificVehicle(dispatch, id);
        }
      } catch (err) {
        if (isMounted) {
          dispatch({ 
            type: "error", 
            payload: "Error al cargar los datos del vehículo" 
          });
        }
      }
    };

    fetchVehicle();

    return () => {
      isMounted = false;
      dispatch({ type: "RESET_SPECIFIC_VEHICLE" });
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Cargando vehículo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Error al cargar el vehículo</h3>
        <p>{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!specificVehicle || !specificVehicle._id) {
    return (
      <div className="not-found-message">
        <p>No se encontró información del vehículo</p>
      </div>
    );
  }

  return (
    <div className="vehicle-container">
      <div className="vehicle-card">
        <div className="vehicle-image-container">
          <img
            src={specificVehicle.image || "https://via.placeholder.com/600x400?text=Imagen+no+disponible"}
            alt={`Vehículo ${specificVehicle.name || "desconocido"}`}
            className="vehicle-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400?text=Imagen+no+disponible";
            }}
          />
        </div>

        <div className="vehicle-content">
          <h1 className="vehicle-title">{specificVehicle.name || "Vehículo no identificado"}</h1>
          
          <div className="vehicle-text">
            <p><strong>Descripción:</strong> {specificVehicle.description || "No hay descripción disponible."}</p>
          </div>

          <FavoriteButton 
          item={specificVehicle} 
          type="vehicle" 
        />
          
        </div>
      </div>
    </div>
  );
}

export default VehicleSpecific;