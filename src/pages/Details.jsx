import { useLocation, useNavigate } from "react-router-dom";
import { useStarWarsStore } from "../hooks/useStarWarsStore";
import { capitalizeFirst } from "../utils/textFormatters";

export const Details = () => {

  const { state: { favorites }, dispatch } = useStarWarsStore();
  const { state: location } = useLocation();
  const navigate = useNavigate();

  const addFavorite = () => {
    if (favorites.some(f => f.id === item.id)) {
      dispatch({ type: "REMOVE_FAVORITE", payload: item });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: item });
    };
  }

  const item = location?.item;
  if (!item) {
    console.warn("No item found in state, navigating home.");
    navigate("/");
    return null;
  }
  console.log("Item details:", item);

  let resourceType;
  let imgType;
  if ("gender" in item) {
    resourceType = "character";
    imgType = "people";
  } else if ("terrain" in item) {
    resourceType = "planet";
    imgType = "planets";
  } else if ("passengers" in item) {
    resourceType = "vehicle";
    imgType = "vehicles";
  }
 
  const imgUrl = "https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/" + imgType + "/" + item.uid + ".jpg";
  console.log("Image URL:", imgUrl);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex align-items-center gap-3">
        <div className="container w-50 justify-content-center d-flex">
          <img className="img-fluid w-100" style={{ maxHeight: "600px", objectFit: "contain" }} src={imgUrl} alt="Imagen no disponible" />
        </div>
        <div className="text-center w-50 d-flex flex-column align-items-center justify-content-center p-3">
          <div className="d-flex w-100 justify-content-evenly align-items-center">
            <h1>{item.name}</h1>
            <button className={favorites.some(f => f.id === item.id) ? "btn btn-warning" : "btn btn-outline-warning"} onClick={addFavorite}><i className="fa-regular fa-heart"></i></button>
          </div>
          <p>Fusce auctor libero nulla, eu tincidunt velit imperdiet sit amet. Aenean quis lorem vitae mi congue imperdiet eu eu purus. Etiam maximus ipsum sit amet mauris sagittis, vel tempus est pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer eu viverra tortor, eget porta lorem. Vivamus eu nisi sollicitudin odio porta pharetra non a sem. </p>
        </div>
      </div>
      <div className="d-flex border-top border-danger mt-5 text-danger justify-content-evenly">
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
                <b>Passengers</b>
                <p>{capitalizeFirst(item.passengers)}</p>
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
