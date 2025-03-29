export const initialStore = () => {
  return {
    message: null,
    loading: false,
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    films: [],
    people: [],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "characters":
      return {
        ...store,
        characters: action.payload,
        loading: false
      };
    case "planets":
      return {
        ...store,
        planets: action.payload,
        loading: false
      };
    case "starships":
      return {
        ...store,
        starships: action.payload,
        loading: false
      };
    case "vehicles":
      return {
        ...store,
        vehicles: action.payload,
        loading: false
      };
    case "species":
      return {
        ...store,
        species: action.payload,
        loading: false
      };
    case "films":
      return {
        ...store,
        films: action.payload,
        loading: false
      };
    case "people":
      return {
        ...store,
        people: action.payload,
        loading: false
      };
    case "favorites":
      return {
        ...store,
        favorites: action.payload
      };
    case "message":
      return {
        ...store,
        message: action.payload
      };
    case "loading":
      return {
        ...store,
        loading: action.payload
      };
    case "reset":
      return initialStore();
    default:
      throw new Error("Unknown action.");
  }
}

// Funciones para obtener datos de la API
export const getAllCharacters = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando personajes..." });
    
    const response = await fetch("https://starwars-databank-server.vercel.app/api/v1/characters");
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Formato de datos inesperado");
    }

    const formattedCharacters = data.data.map((character) => ({
      id: character._id,
      name: character.name,
      description: character.description,
      image: character.image,
      origin: character.origin || "Origen desconocido"
    }));

    dispatch({ type: "characters", payload: formattedCharacters });
    dispatch({ type: "message", payload: `${formattedCharacters.length} personajes cargados` });
    return formattedCharacters;

  } catch (error) {
    console.error("Error al obtener personajes:", error);
    dispatch({ 
      type: "message", 
      payload: `Error: ${error.message}`
    });
    dispatch({ type: "characters", payload: [] });
    return [];
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};

export const getAllPlanets = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando planetas..." });
    
    const response = await fetch("https://starwars-databank-server.vercel.app/api/v1/planets");
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos de planetas recibidos:", data); // Para diagnóstico

    // Verificar varios formatos posibles
    let planetsData = [];
    
    if (Array.isArray(data)) {
      // Caso 1: La API devuelve un array directamente
      planetsData = data;
    } else if (data.data && Array.isArray(data.data)) {
      // Caso 2: Formato con propiedad data
      planetsData = data.data;
    } else if (data.results && Array.isArray(data.results)) {
      // Caso 3: Formato estilo SWAPI
      planetsData = data.results;
    } else {
      throw new Error("Formato de datos no reconocido");
    }

    // Mapeo a formato consistente
    const formattedPlanets = planetsData.map((planet) => ({
      id: planet._id || planet.id || Math.random().toString(36).substr(2, 9),
      name: planet.name || "Planeta desconocido",
      description: planet.description || planet.overview || "Descripción no disponible",
      image: planet.image || planet.img_url || 
            `https://starwars-visualguide.com/assets/img/planets/${planet._id || planet.id || 1}.jpg`,
      climate: planet.climate || planet.climate_info || "Clima desconocido",
      terrain: planet.terrain || "Terreno desconocido",
      population: planet.population || "Población desconocida"
    }));

    dispatch({ type: "planets", payload: formattedPlanets });
    dispatch({ type: "message", payload: `${formattedPlanets.length} planetas cargados` });
    return formattedPlanets;

  } catch (error) {
    console.error("Error al obtener planetas:", error);
    dispatch({ type: "message", payload: `Error: ${error.message}` });
    dispatch({ type: "planets", payload: [] });
    return [];
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};
export const getAllStarships = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando naves estelares..." });
    
    const response = await fetch("https://starwars-databank-server.vercel.app/api/v1/starships");
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Formato de datos inesperado");
    }

    const formattedStarships = data.data.map((starship) => ({
      id: starship._id,
      name: starship.name,
      description: starship.description,
      image: starship.image,
      model: starship.model || "Modelo desconocido"
    }));

    dispatch({ type: "starships", payload: formattedStarships });
    dispatch({ type: "message", payload: `${formattedStarships.length} naves cargadas` });
    return formattedStarships;

  } catch (error) {
    console.error("Error al obtener naves:", error);
    dispatch({ type: "message", payload: `Error: ${error.message}` });
    dispatch({ type: "starships", payload: [] });
    return [];
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};

export const getAllVehicles = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando vehículos..." });
    
    const response = await fetch("https://starwars-databank-server.vercel.app/api/v1/vehicles");
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Formato de datos inesperado");
    }

    const formattedVehicles = data.data.map((vehicle) => ({
      id: vehicle._id,
      name: vehicle.name,
      description: vehicle.description,
      image: vehicle.image,
      vehicleClass: vehicle.vehicleClass || "Clase desconocida"
    }));

    dispatch({ type: "vehicles", payload: formattedVehicles });
    dispatch({ type: "message", payload: `${formattedVehicles.length} vehículos cargados` });
    return formattedVehicles;

  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    dispatch({ type: "message", payload: `Error: ${error.message}` });
    dispatch({ type: "vehicles", payload: [] });
    return [];
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};

export const getAllSpecies = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando especies..." });
    
    const response = await fetch("https://starwars-databank-server.vercel.app/api/v1/species");
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Formato de datos inesperado");
    }

    const formattedSpecies = data.data.map((specie) => ({
      id: specie._id,
      name: specie.name,
      description: specie.description,
      image: specie.image,
      classification: specie.classification || "Clasificación desconocida"
    }));

    dispatch({ type: "species", payload: formattedSpecies });
    dispatch({ type: "message", payload: `${formattedSpecies.length} especies cargadas` });
    return formattedSpecies;

  } catch (error) {
    console.error("Error al obtener especies:", error);
    dispatch({ type: "message", payload: `Error: ${error.message}` });
    dispatch({ type: "species", payload: [] });
    return [];
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};

export const getAllFilms = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando películas..." });
    
    const response = await fetch("https://starwars-databank-server.vercel.app/api/v1/films");
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Formato de datos inesperado");
    }

    const formattedFilms = data.data.map((film) => ({
      id: film._id,
      title: film.title,
      description: film.description,
      image: film.image,
      director: film.director || "Director desconocido",
      releaseDate: film.releaseDate || "Fecha desconocida"
    }));

    dispatch({ type: "films", payload: formattedFilms });
    dispatch({ type: "message", payload: `${formattedFilms.length} películas cargadas` });
    return formattedFilms;

  } catch (error) {
    console.error("Error al obtener películas:", error);
    dispatch({ type: "message", payload: `Error: ${error.message}` });
    dispatch({ type: "films", payload: [] });
    return [];
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};

export const getAllPeople = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando personajes..." });
    
    const response = await fetch("https://starwars-databank-server.vercel.app/api/v1/characters");
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Formato de datos inesperado");
    }

    const formattedPeople = data.data.map((person) => ({
      id: person._id,
      name: person.name,
      description: person.description,
      image: person.image,
      origin: person.origin || "Origen desconocido"
    }));

    dispatch({ type: "people", payload: formattedPeople });
    dispatch({ type: "message", payload: `${formattedPeople.length} personas cargadas` });
    return formattedPeople;

  } catch (error) {
    console.error("Error al obtener personas:", error);
    dispatch({ type: "message", payload: `Error: ${error.message}` });
    dispatch({ type: "people", payload: [] });
    return [];
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};

// Funciones para manejar favoritos
export const addFavorite = (store) => (item) => {
  const newFavorites = [...store.favorites, item];
  return {
    type: "favorites",
    payload: newFavorites
  };
};

export const removeFavorite = (store) => (itemId) => {
  const newFavorites = store.favorites.filter((item) => item.id !== itemId);
  return {
    type: "favorites",
    payload: newFavorites
  };
};

// Función para resetear el store
export const resetStore = () => {
  return {
    type: "reset"
  };
};