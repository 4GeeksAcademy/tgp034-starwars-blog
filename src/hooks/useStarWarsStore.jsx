import { createContext, useReducer, useContext, useEffect, useCallback } from "react"
import starWarsReducer, { initialStarWarsStore } from "../starWarsStore"
import { getAllPeople, getAllPlanets, getAllVehicles } from "../api/StarWarsApi"

const StarWarsContext = createContext();

export function StarWarsProvider({ children }) {

  const STORAGE_KEY = "starWarsData";
  const [state, dispatch] = useReducer(starWarsReducer, initialStarWarsStore());

  const loadAll = useCallback(async () => {
    console.log("Cargando datos desde la API...");
    try {
      const [chars, planets, vehicles] = await Promise.all([
        getAllPeople(),
        getAllPlanets(),
        getAllVehicles()
      ]);

      dispatch({ type: "LOAD_CHARACTERS", payload: chars });
      dispatch({ type: "LOAD_PLANETS", payload: planets });
      dispatch({ type: "LOAD_VEHICLES", payload: vehicles });
      dispatch({ type: "LOAD_FAVORITES", payload: [] });

    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      console.log("Cargando datos desde el almacenamiento local...");
      const { characters, planets, vehicles, favorites } = JSON.parse(cached);
      if (characters && characters.length > 0 &&
        planets && planets.length > 0 &&
        vehicles && vehicles.length > 0) {
        console.log("Datos cargados desde el almacenamiento local:", { characters, planets, vehicles, favorites });
        dispatch({ type: "LOAD_CHARACTERS", payload: characters });
        dispatch({ type: "LOAD_PLANETS", payload: planets });
        dispatch({ type: "LOAD_VEHICLES", payload: vehicles });
        dispatch({ type: "LOAD_FAVORITES", payload: favorites });
        return;
      } else {
        console.warn("Datos incompletos en el almacenamiento local, recargando desde la API...");
        loadAll();
        return;
      }
    } else {
      console.warn("No hay datos en el almacenamiento local, cargando desde la API...");
      loadAll();
    }

  }, [loadAll])

 useEffect(() => {
    if (state.characters.length > 0 || state.planets.length > 0 || state.vehicles.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  return (
    <StarWarsContext.Provider value={{ state, dispatch }}>
      {children}
    </StarWarsContext.Provider>
  )
}

export function useStarWarsStore() {
  const context = useContext(StarWarsContext)
  if (!context) {
    throw new Error("useStarWarsStore debe usarse dentro de <StarWarsProvider>")
  }
  return context
}