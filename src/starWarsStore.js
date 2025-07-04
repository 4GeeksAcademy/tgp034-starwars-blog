export function initialStarWarsState() {
  return {
    characters: [],   
    planets: [],     
    vehicles: [],  
    favorites: [],    
  }
}

export default function starWarsReducer(state, action) {
  switch (action.type) {

    case "LOAD_CHARACTERS":
      return {
        ...state,
        characters: action.payload
      }

    case "LOAD_PLANETS":
      return {
        ...state,
        planets: action.payload
      }

    case "LOAD_VEHICLES":
      return {
        ...state,
        vehicles: action.payload
      }

    case "LOAD_FAVORITES":
      return {
        ...state,
        favorites: action.payload
      }

    case "ADD_FAVORITE":
      if (state.favorites.some(f => f.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload.id)
      }

    default:
      return state
  }
}