import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { getAllPlanets } from '../store';


function Planets() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadData = async () => {
      try {
        const planets = await getAllPlanets(dispatch, { signal });
        console.log("Planetas cargados:", planets); // Para diagnóstico
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error cargando planetas:", error);
        }
      }
    };

    loadData();

    return () => controller.abort();
  }, [dispatch]);

  // Renderizado condicional mejorado
  const renderContent = () => {
    if (store.loading) {
      return (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Escaneando galaxia...</p>
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

    if (store.planets.length === 0) {
      return (
        <div className="empty-state">
          <p>No se detectaron planetas en este sector</p>
        </div>
      );
    }

    return (
      <div className="planets-grid">
        {store.planets.map((planet) => (
          <div key={planet.id} className="planet-card">
            <div className="planet-image-container">
              <img
                src={planet.image}
                alt={`Planeta ${planet.name}`}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
                }}
              />
            </div>
            <div className="planet-info">
              <h3>{planet.name}</h3>
              <div className="planet-meta">
                <span><strong>Clima:</strong> {planet.climate}</span>
                <span><strong>Terreno:</strong> {planet.terrain}</span>
                <span><strong>Población:</strong> {planet.population}</span>
              </div>
              <p className="planet-description">
                {planet.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="planets-container">
      <header className="planets-header">
        <h1 className="planets-title">Archivos Planetarios</h1>
        <div className="status-info">
          {store.message && (
            <div className={`status-message ${
              store.message.includes("Error") ? "error" : "info"
            }`}>
              {store.message}
            </div>
          )}
        </div>
      </header>

      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
}

export default Planets;