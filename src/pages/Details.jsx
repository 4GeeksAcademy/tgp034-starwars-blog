// src/views/Details.jsx
import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export const Details = () => {

  function capitalizeFirst(str = "") {
    if (str == "n/a") return "N/A";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const { state } = useLocation();
  const navigate = useNavigate();

  // Recuperamos el item pasado en el estado de navegación
  const item = state?.item;

  // Si no hay item en state, volvemos atrás
  if (!item) {
    navigate(-1);
    return null;
  }

  // Inferir el tipo de recurso a partir de una propiedad única
  let resourceType;
  if ("gender" in item) {
    resourceType = "character";
  } else if ("terrain" in item) {
    resourceType = "planet";
  } else if ("passengers" in item) {
    resourceType = "vehicle";
  } else {
    resourceType = "unknown";
  }

  return (
    <div className="container-fluid p-5">
      <div className="d-flex align-items-center gap-3">
        <div className="container w-50 justify-content-center d-flex">
          <img className="w-100" style={{maxWidth:"500px"}} src="https://marvel-b1-cdn.bc0a.com/f00000000279829/uwf.edu/media/university-of-west-florida/offices/university-marketing-and-communications/webservices/miscimages/800x600.png" alt="" />
        </div>
        <div className="text-center w-50 d-flex flex-column align-items-center justify-content-center p-3">
          <h1>{item.name}</h1>
          <p>Fusce auctor libero nulla, eu tincidunt velit imperdiet sit amet. Aenean quis lorem vitae mi congue imperdiet eu eu purus. Etiam maximus ipsum sit amet mauris sagittis, vel tempus est pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer eu viverra tortor, eget porta lorem. Vivamus eu nisi sollicitudin odio porta pharetra non a sem. </p>
        </div>
      </div>
      <div className="d-flex border-top border-danger mt-3 text-danger justify-content-evenly">
        <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
          <b>Name</b>
          <p>{item.name}</p>
        </div>
        {resourceType === "character" && (
          <>
            <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
              <b>Birth Year</b>
              <p>{capitalizeFirst(item.birth_year)}</p>
            </div>
            <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
              <b>Gender</b>
              <p>{capitalizeFirst(item.gender)}</p>
            </div>
            <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
              <b>Hair Color</b>
              <p>{capitalizeFirst(item.hair_color)}</p>
            </div>
            <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
              <b>Eye Color</b>
              <p>{capitalizeFirst(item.eye_color)}</p>
            </div>
          </>) || resourceType === "planet" && (
            <>
            <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
              <b>Climate</b>
              <p>{capitalizeFirst(item.climate)}</p>
            </div>
            <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
              <b>Population</b>
              <p>{capitalizeFirst(item.population)}</p>
            </div>
            <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
              <b>Orbital period</b>
              <p>{capitalizeFirst(item.orbital_period)}</p>
            </div>
            <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
              <b>Rotation period</b>
              <p>{capitalizeFirst(item.rotation_period)}</p>
            </div>
            </>
          ) || resourceType === "vehicle" && (
            <> 
              <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
                <b>Model</b>
                <p>{capitalizeFirst(item.model)}</p>
              </div>
              <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
                <b>Cost in credits</b>
                <p>{capitalizeFirst(item.cost_in_credits)}</p>
              </div>
              <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
                <b>Max atmosphering speed</b>
                <p>{capitalizeFirst(item.max_atmosphering_speed)}</p>
              </div>
              <div className="text-center d-flex flex-column align-items-center justify-content-center p-3 gap-3">
                <b>Crew</b>
                <p>{capitalizeFirst(item.crew)}</p>
              </div>
            </>
          )}
      </div>
    </div>
  );
}
