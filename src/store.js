export const initialStore=()=>{
  return{
    message: null,
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    films: [],
    people: [],
    favorites: [],
    
    
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
  
    default:
      throw Error('Unknown action.');
  }    
}
