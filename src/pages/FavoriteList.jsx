// pages/FavoritesPage.js
import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import FavoriteButton from '../components/FavoriteBuuton';

const FavoritesPage = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="favorites-container" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: '2rem',
        textShadow: '0 2px 4px rgba(255, 215, 0, 0.3)'
      }}>
        Tus Favoritos
      </h1>
      
      {store.favorites.length === 0 ? (
        <p style={{ 
          textAlign: 'center', 
          color: '#90a4ae',
          fontSize: '1.2rem',
          padding: '40px 0'
        }}>
          No tienes favoritos aún
        </p>
      ) : (
        <div className="favorites-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '15px',
          padding: '10px'
        }}>
          {store.favorites.map(item => (
            <div key={item.id} className="favorite-card" style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#1a1a2e',
              borderRadius: '8px',
              padding: '8px',
              boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
              border: '1px solid #33334d',
              ':hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 12px rgba(255, 215, 0, 0.1)'
              }
            }}>
              {/* Botón de eliminar más discreto */}
              <div style={{
                
                top: '3px',
                right: '3px',
                zIndex: '2'
              }}>
                <FavoriteButton 
                  item={item} 
                  type={item.type}
                  style={{
                    background: 'rgba(255, 50, 50, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    marginBottom: '5px',
                    padding: 0,
                    ':hover': {
                      background: '#ff0000'
                    }
                  }}
                >
                  ×
                </FavoriteButton>
              </div>
              
              <img 
                src={item.image} 
                alt={item.name} 
                style={{
                  width: '100%',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  marginBottom: '8px'
                }}
              />
              
              <h3 style={{
                margin: '0',
                fontSize: '13px',
                textAlign: 'center',
                color: '#e0e0e0',
                fontWeight: '500',
                padding: '0 5px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}>
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;