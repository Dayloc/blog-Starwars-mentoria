export const initialStore = () => {
  return {
    message: null,
    loading: false,
    error: null, // Añadido para manejo consistente de errores
    characters: [],
    locations: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    films: [],
    favorites: [],
    specificLocation: null,
    specificVehicle: null,
    specificCharacter: null, // Sugerido para consistencia
    specificFilm: null,     // Sugerido para consistencia
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    // Casos generales
    case "loading":
      return { ...store, loading: action.payload };
    case "message":
      return { ...store, message: action.payload, error: null };
    case "error":
      return { ...store, error: action.payload, loading: false };
    case "reset":
      return initialStore();

    // Listados
    case "characters":
      return { ...store, characters: action.payload, loading: false };
    case "planets":
      return { ...store, planets: action.payload, loading: false };
    case "locations":
      return { ...store, locations: action.payload, loading: false };
    case "starships":
      return { ...store, starships: action.payload, loading: false };
    case "vehicles":
      return { ...store, vehicles: action.payload, loading: false };
    case "species":
      return { ...store, species: action.payload, loading: false };
    case "films":
      return { ...store, films: action.payload, loading: false };
      case "ADD_FAVORITE":
        return {
          ...store,
          favorites: [...store.favorites, action.payload],
          message: `${action.payload.name} añadido a favoritos`
        };
      
      case "REMOVE_FAVORITE":
        return {
          ...store,
          favorites: store.favorites.filter(item => item.id !== action.payload.id),
          message: `${action.payload.name} removido de favoritos`
        };

    // Detalles específicos
    case "SET_SPECIFIC_LOCATION":
      return {
        ...store,
        specificLocation: action.payload,
        loading: false,
        error: null
      };
    case "RESET_SPECIFIC_LOCATION":
      return { ...store, specificLocation: null };
      
    case "SET_SPECIFIC_VEHICLE":
      return {
        ...store,
        specificVehicle: action.payload,
        loading: false,
        error: null
      };
    case "RESET_SPECIFIC_VEHICLE":
      return { ...store, specificVehicle: null };

    default:
      console.warn(`Acción desconocida: ${action.type}`);
      return store;
  }
}

// Funciones para obtener datos de la API
export const getAllCharacters = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando personajes..." });

    const response = await fetch(
      "https://starwars-databank-server.vercel.app/api/v1/characters"
    );

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
      origin: character.origin || "Origen desconocido",
    }));

    dispatch({ type: "characters", payload: formattedCharacters });
    dispatch({
      type: "message",
      payload: `${formattedCharacters.length} personajes cargados`,
    });
    return formattedCharacters;
  } catch (error) {
    console.error("Error al obtener personajes:", error);
    dispatch({
      type: "message",
      payload: `Error: ${error.message}`,
    });
    dispatch({ type: "characters", payload: [] });
    return [];
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};

export const getAllLocations = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando ubicaciones..." });

    const response = await fetch(
      "https://starwars-databank-server.vercel.app/api/v1/locations"
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Formato de datos inesperado");
    }

    const formattedLocations = data.data.map((location) => ({
      id: location._id,
      name: location.name,
      description: location.description,
      image: location.image,
    }));

    dispatch({ type: "locations", payload: formattedLocations });
    dispatch({
      type: "message",
      payload: `${formattedLocations.length} ubicaciones cargadas`,
    });
    return formattedLocations;
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    dispatch({
      type: "message",
      payload: `Error: ${error.message}`,
    });
    dispatch({ type: "locations", payload: [] });
    return [];
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};
export const getSpecificLocation = async (dispatch, nombre) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "RESET_SPECIFIC_LOCATION" });

    const response = await fetch(
      `https://starwars-databank-server.vercel.app/api/v1/locations/name/${encodeURIComponent(
        nombre
      )}`
    );

    if (!response.ok) {
      throw new Error(`Ubicación no encontrada (${response.status})`);
    }

    const data = await response.json();

    // Verificación exhaustiva de la estructura de datos
    if (!Array.isArray(data) || data.length === 0 || !data[0].name) {
      throw new Error("Datos de ubicación incompletos");
    }

    const locationData = data[0];

    const formattedLocation = {
      id: locationData._id,
      name: locationData.name,
      description: locationData.description,
      image: locationData.image || DEFAULT_IMAGE,
      climate: locationData.climate,
      terrain: locationData.terrain,
      population: locationData.population,
    };

    dispatch({ type: "SET_SPECIFIC_LOCATION", payload: formattedLocation });
    return formattedLocation;
  } catch (error) {
    console.error("Error fetching location:", error);
    dispatch({ type: "RESET_SPECIFIC_LOCATION", payload: error.message });
    return null;
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};
export const getAllStarships = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando naves estelares..." });

    const response = await fetch(
      "https://starwars-databank-server.vercel.app/api/v1/starships"
    );

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
      model: starship.model || "Modelo desconocido",
    }));

    dispatch({ type: "starships", payload: formattedStarships });
    dispatch({
      type: "message",
      payload: `${formattedStarships.length} naves cargadas`,
    });
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

    const response = await fetch(
      "https://starwars-databank-server.vercel.app/api/v1/vehicles"
    );

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
      model: vehicle.model || "Modelo desconocido",
      manufacturer: vehicle.manufacturer || "Fabricante desconocido",
    }));

    dispatch({ type: "vehicles", payload: formattedVehicles });
    dispatch({
      type: "message",
      payload: `${formattedVehicles.length} vehículos cargados`,
    });
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

export const getSpecificVehicle = async (dispatch, id) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando vehículo..." });

    const response = await fetch(
      `https://starwars-databank-server.vercel.app/api/v1/vehicles/${id}`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Validación acorde a la respuesta real
    if (!data || !data._id) {
      throw new Error("El vehículo no contiene los datos esperados");
    }

    const formattedVehicle = {
      id: data._id,
      name: data.name,
      description: data.description,
      image: data.image,
      // Estos campos son opcionales según la respuesta
      model: data.model || null,
      manufacturer: data.manufacturer || null,
      // Mantenemos toda la data por si acaso
      ...data
    };

    dispatch({ type: "SET_SPECIFIC_VEHICLE", payload: formattedVehicle });
    dispatch({
      type: "message",
      payload: `Vehículo "${formattedVehicle.name}" cargado`,
    });
    return formattedVehicle;
  } catch (error) {
    console.error("Error al obtener el vehículo:", error);
    dispatch({ type: "error", payload: error.message });
    dispatch({ type: "SET_SPECIFIC_VEHICLE", payload: null });
    return null;
  } finally {
    dispatch({ type: "loading", payload: false });
  }
};



export const getAllSpecies = async (dispatch) => {
  try {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "message", payload: "Cargando especies..." });

    const response = await fetch(
      "https://starwars-databank-server.vercel.app/api/v1/species"
    );

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
      classification: specie.classification || "Clasificación desconocida",
    }));

    dispatch({ type: "species", payload: formattedSpecies });
    dispatch({
      type: "message",
      payload: `${formattedSpecies.length} especies cargadas`,
    });
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

    const response = await fetch(
      "https://starwars-databank-server.vercel.app/api/v1/films"
    );

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
      releaseDate: film.releaseDate || "Fecha desconocida",
    }));

    dispatch({ type: "films", payload: formattedFilms });
    dispatch({
      type: "message",
      payload: `${formattedFilms.length} películas cargadas`,
    });
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

    const response = await fetch(
      "https://starwars-databank-server.vercel.app/api/v1/characters"
    );

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
      origin: person.origin || "Origen desconocido",
    }));

    dispatch({ type: "people", payload: formattedPeople });
    dispatch({
      type: "message",
      payload: `${formattedPeople.length} personas cargadas`,
    });
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
export const addToFavorites = (item) => (dispatch) => {
  dispatch({
    type: "ADD_FAVORITE",
    payload: {
      id: item._id || item.id,
      name: item.name,
      type: item.type || 'vehicle', // 'character', 'planet', etc.
      image: item.image
    }
  });
};

export const removeFromFavorites = (item) => (dispatch) => {
  dispatch({
    type: "REMOVE_FAVORITE",
    payload: {
      id: item._id || item.id,
      name: item.name
    }
  });
};

// Función para resetear el store
export const resetStore = () => {
  return {
    type: "reset",
  };
};
