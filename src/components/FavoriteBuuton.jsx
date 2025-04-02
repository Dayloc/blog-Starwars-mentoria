// components/FavoriteButton.js
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { addToFavorites, removeFromFavorites } from "../store/";

const FavoriteButton = ({ item, type }) => {
  const { store,dispatch } = useGlobalReducer();
  const isFavorite = store.favorites.some(
    (fav) => fav.id === (item._id || item.id)
  );

  const handleClick = () => {
    const action = isFavorite ? removeFromFavorites : addToFavorites;
    action({ ...item, type })(dispatch);
  };

  return (
    <button
      onClick={handleClick}
      className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
    >
      {isFavorite ? "★ Eliminar de favoritos" : "☆ Agregar a favoritos"}
    </button>
  );
};

export default FavoriteButton;
