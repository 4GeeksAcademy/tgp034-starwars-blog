import React, { createContext, useReducer, useContext, useEffect } from "react"
import starWarsReducer, { initialStarWarsState } from "../starWarsStore"

const StarWarsContext = createContext(null)
const STORAGE_KEY = "starWarsData"

export function StarWarsProvider({ children }) {
  const [state, dispatch] = useReducer(starWarsReducer, initialStarWarsState())

  // Opcional: centralizar las peticiones
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      console.log("Cargando datos desde el almacenamiento local...");
      const { characters, planets, vehicles, favorites } = JSON.parse(cached);
      if (characters.length === 0 || planets.length === 0 || vehicles.length === 0) {
        console.log("Datos incompletos en el almacenamiento local, cargando desde la API...");
        loadAll();
      } else {
        console.log("Datos cargados desde el almacenamiento local:", { characters, planets, vehicles, favorites });
        dispatch({ type: "LOAD_CHARACTERS", payload: characters });
        dispatch({ type: "LOAD_PLANETS", payload: planets });
        dispatch({ type: "LOAD_VEHICLES", payload: vehicles });
        dispatch({ type: "LOAD_FAVORITES", payload: favorites });
        return;
      }
    }

    async function loadAll() {
      console.log("Cargando datos desde la API...");
      const [charsRes, planetsRes, vehiclesRes] = await Promise.all([
        fetch("https://swapi.tech/api/people/").then(r => r.json()).then(j => j.results),
        fetch("https://swapi.tech/api/planets/").then(r => r.json()).then(j => j.results),
        fetch("https://swapi.tech/api/vehicles/").then(r => r.json()).then(j => j.results)
      ])

      const chars = await Promise.all(
        charsRes.map(async char => {
          const details = await fetch(char.url).then(r => r.json())
          return { ...details.result.properties, id: details.result._id }
        })
      )

      const planets = await Promise.all(
        planetsRes.map(async planet => {
          const details = await fetch(planet.url).then(r => r.json())
          return { ...details.result.properties, id: details.result._id }
        })
      )

      const vehicles = await Promise.all(
        vehiclesRes.map(async vehicle => {
          const details = await fetch(vehicle.url).then(r => r.json())
          return { ...details.result.properties, id: details.result._id }
        })
      )

      dispatch({ type: "LOAD_CHARACTERS", payload: chars })
      dispatch({ type: "LOAD_PLANETS", payload: planets })
      dispatch({ type: "LOAD_VEHICLES", payload: vehicles })
      dispatch({ type: "LOAD_FAVORITES", payload: [] })

      localStorage.setItem(STORAGE_KEY, JSON.stringify({ characters: chars, planets: planets, vehicles: vehicles, favorites: [] }))
    }

  }, [dispatch])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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