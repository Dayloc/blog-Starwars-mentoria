import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getAllLocations } from "../store";
import { Link } from "react-router-dom";
import "../styles/Planets.css";

function Planets() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    getAllLocations(dispatch);
  }, [dispatch]);

  const renderContent = () => {
    if (store.loading) {
      return <div className="loading-state">Cargando ubicaciones...</div>;
    }

    if (store.error) {
      return <div className="error-state">Error: {store.error}</div>;
    }

    if (!store.locations || store.locations.length === 0) {
      return <div className="empty-state">No hay ubicaciones disponibles</div>;
    }

    return (
      <div className="locations-grid">
        {store.locations.map((location) => {
        
          return (
            <div key={location._id} className="location-card">
              <div className="location-image-container">
                <Link to={`/location/${location.name}`}>
                  <img
                    src={location.image}
                    alt={location.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x200?text=Star+Wars";
                    }}
                  />
                </Link>
              </div>
              <div className="location-info">
                <h3>{location.name}</h3>
                <p>{location.description}</p>
                <Link to={`/location/${location.name}`} className="details-link">
                  Ver detalles
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="locations-container">
      <h1>Ubicaciones</h1>
      {renderContent()}
    </div>
  );
}

export default Planets;
