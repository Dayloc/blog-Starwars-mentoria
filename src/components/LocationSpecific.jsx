import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getSpecificLocation } from "../store";

function LocationSpecific() {
  const { store, dispatch } = useGlobalReducer();
  const { nombre } = useParams();
  console.log({ nombre });

  useEffect(() => {
    if (nombre) {
      getSpecificLocation(dispatch, nombre);
    }
    return () => {
      // Limpiar al desmontar
      dispatch({ type: "RESET_SPECIFIC_LOCATION" });
    };
  }, [dispatch, nombre]);

  if (store.loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Buscando ubicación en la base de datos...</p>
      </div>
    );
  }

  if (store.error) {
    return (
      <div className="error-screen">
        <h2>Error</h2>
        <p>{store.error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  if (!store.specificLocation) {
    return (
      <div className="not-found-screen">
        <p>No se encontraron datos para esta ubicación</p>
        <p>Intenta con otro nombre o verifica la ortografía</p>
      </div>
    );
  }

  const { name, description, image, climate, terrain, population } =
    store.specificLocation;

  return (
    <div className="character-card">
      <h1 className="location-title">{name}</h1>

      <div className="character-image-container">
        <img
          src={image}
          alt={`Vista de ${name}`}
          onError={(e) => {
            e.target.src =
              "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
          }}
        />
      </div>

      <div className="location-content">
        <section className="description-section">
          <h2>Descripción</h2>
          <p>{description}</p>
        </section>

        <div className="location-details">
          {climate && (
            <div className="detail-card">
              <h3>Clima</h3>
              <p>{climate}</p>
            </div>
          )}

          {terrain && (
            <div className="detail-card">
              <h3>Terreno</h3>
              <p>{terrain}</p>
            </div>
          )}

          {population && (
            <div className="detail-card">
              <h3>Población</h3>
              <p>{population}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationSpecific;
