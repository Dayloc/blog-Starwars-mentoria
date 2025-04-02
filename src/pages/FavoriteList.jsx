// pages/FavoritesPage.js
import React from 'react';
import  useGlobalReducer  from '../hooks/useGlobalReducer';
import FavoriteButton from '../components/FavoriteButton';

const FavoritesPage = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="favorites-container">
      <h1>Tus Favoritos</h1>
      {store.favorites.length === 0 ? (
        <p>No tienes favoritos aún</p>
      ) : (
        <div className="favorites-grid">
          {store.favorites.map(item => (
            <div key={item.id} className="favorite-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <span className="favorite-type">{item.type}</span>
              <FavoriteButton item={item} type={item.type} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;