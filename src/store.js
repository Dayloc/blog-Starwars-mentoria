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


// Función para resetear el store
export const resetStore = () => {
  return {
    type: "reset",
  };
};
