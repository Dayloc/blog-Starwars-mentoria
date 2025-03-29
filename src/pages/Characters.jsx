import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getAllCharacters } from "../store";
import { Link } from "react-router-dom";


function Characters() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadData = async () => {
      try {
        await getAllCharacters(dispatch, { signal });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error:", error);
        }
      }
    };

    loadData();

    return () => controller.abort();
  }, [dispatch]);

  return (
    <div className="characters-container">
      <header className="characters-header">
        <h1 className="characters-title">Personajes de Star Wars</h1>
       
      </header>

      <div className="content-area">
        {store.characters.length > 0 ? (
          <div className="characters-grid">
            {store.characters.map((character) => (
              <div key={character.id} className="character-card">
                <div className="character-image-container">
                  <img
                    src={character.image}
                    alt={character.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                    }}
                  />
                </div>
                <div className="character-info">
                  <h3>{character.name}</h3>
                  <p className="character-description">
                    
                    {character.description}
                  </p>
                  
                  
                </div>
                <div className="character-details m-5">
                 <Link to={`/character/${character.id}`}><p className="text-warning">Detail Character</p></Link> 
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loading-state">
            {!store.message?.includes("Error") ? (
              <>
                <div className="loading-spinner"></div>
                <p>Conectando con la base de datos...</p>
              </>
            ) : (
              <div className="error-state">
                <p>{store.message}</p>
                <button
                  className="retry-button"
                  onClick={() => window.location.reload()}
                >
                  Reintentar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Characters;