// components/FavoriteButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { addToFavorites, removeFromFavorites } from "../services/Fetch";

const FavoriteButton = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const isFavorite = store.favorites.some(
    (fav) => fav.id === (item._id || item.id)
  );

  const handleClick = () => {
    const action = isFavorite ? removeFromFavorites : addToFavorites;
    action({ ...item, type })(dispatch);

    // Redirigir a la página de favoritos después de 1 segundo
    setTimeout(() => {
      navigate("/favoritesList");
    }, 1000);
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
