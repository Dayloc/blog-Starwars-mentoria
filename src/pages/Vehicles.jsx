import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { getAllVehicles } from '../store';

function Vehicles() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadData = async () => {
      try {
        await getAllVehicles(dispatch, { signal });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error cargando vehículos:", error);
        }
      }
    };

    loadData();

    return () => controller.abort();
  }, [dispatch]);

  const renderContent = () => {
    if (store.loading) {
      return (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Escaneando registros de vehículos...</p>
        </div>
      );
    }

    if (store.message && store.message.includes("Error")) {
      return (
        <div className="error-state">
          <p>¡Alerta técnica! {store.message}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Reintentar conexión
          </button>
        </div>
      );
    }

    if (store.vehicles.length === 0) {
      return (
        <div className="empty-state">
          <p>No se detectaron vehículos en los registros</p>
        </div>
      );
    }

    return (
      <div className="vehicles-grid">
        {store.vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-card">
            <div className="vehicle-image-container">
              <img
                src={vehicle.image}
                alt={`Vehículo ${vehicle.name}`}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
                }}
              />
            </div>
            <div className="vehicle-info">
              <h3>{vehicle.name}</h3>
              <div className="vehicle-meta">
                <span><strong>Modelo:</strong> {vehicle.model}</span>
                <span><strong>Fabricante:</strong> {vehicle.manufacturer}</span>
              </div>
              <p className="vehicle-description">
                {vehicle.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="vehicles-container">
      <header className="vehicles-header">
        <h1 className="vehicles-title">Archivos de Vehículos</h1>
        
      </header>

      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
}

export default Vehicles;