import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CharacterDetail.css'; 
import FavoriteButton from '../components/FavoriteBuuton'; // Asegúrate de que la ruta sea correcta

function CharacterSpecific() {
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Obtener el ID de los parámetros de la URL



  useEffect(() => {
    fetchData();
  }, [id]); // Added id as dependency to refetch if id changes

  const fetchData = async () => {
    try {
      const response = await fetch(`https://starwars-databank-server.vercel.app/api/v1/characters/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      setPersonaje(data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!personaje) return <div>No se encontró el personaje</div>;

  return (
    <div>
      {/* Renderizar  datos aquí */}
      {personaje && (
        <div key={personaje._id} className="character-card text-center mt-5 p-2">
          <div className="character-image-container">
            <img
              src={personaje.image}
              alt={`Personaje ${personaje.name}`}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
              }}
            />
          </div>
          <h2  className='mt-3'>{personaje.name}</h2>
          <p className='text-warning mx-4'>Ddescription: </p>
          <div >
             <p className='m-4'> {personaje.description}
              </p>
          </div>
          <div>
            <FavoriteButton
            item={personaje} 
            type="vehicle" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterSpecific;