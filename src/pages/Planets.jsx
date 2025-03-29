import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getAllLocations } from "../store";

function Planets() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    getAllLocations(dispatch);
  }, [dispatch]);

  // Renderizado condicional
  const renderContent = () => {
    if (store.loading) {
      return (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Escaneando galaxia para ubicaciones...</p>
        </div>
      );
    }

    if (store.message && store.message.includes("Error")) {
      return (
        <div className="error-state">
          <p>¡Alerta Jedi! {store.message}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Reintentar conexión
          </button>
        </div>
      );
    }

    if (store.locations && store.locations.length === 0) {
      return (
        <div className="empty-state">
          <p>No se detectaron ubicaciones en este sector</p>
        </div>
      );
    }

    return (
      <div className="locations-grid">
        {store.locations?.map((location) => (
          <div key={location._id} className="location-card">
            <div className="location-image-container">
              <img
                src={location.image}
                alt={`Ubicación ${location.name}`}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
                }}
              />
            </div>
            <div className="location-info">
              <h3>{location.name}</h3>
              <p className="location-description">{location.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="locations-container">
      <header className="locations-header">
        <h1 className="locations-title">Archivos de Ubicaciones</h1>
       
      </header>

      <div className="content-area">{renderContent()}</div>
    </div>
  );
}

export default Planets;
