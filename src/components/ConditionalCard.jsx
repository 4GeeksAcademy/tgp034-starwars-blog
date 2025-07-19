import { useNavigate } from "react-router-dom";
import { capitalizeFirst } from "../utils/textFormatters";
import { useFavorites } from "../hooks/useFavorites";

export const ConditionalCard = ({ cardType, item }) => {
    const navigate = useNavigate();
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some(f => f.id === item.id);
    const handleClick = () => {
        navigate('/details/' + item.name, { state: { item } });
    }
    const imgType = cardType === "character" ? "people" : cardType === "vehicle" ? "vehicles" : "planets";
    const imgUrl = "https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/"+ imgType + "/" + item.uid + ".jpg";
    
    return (
        <div className="border border-1 rounded-2 m-2" style={{ width: "401px" }}>
            <img className="rounded-top-2 w-100" src={imgUrl} alt="Img not available" />
            <div className="p-4 w-100">
                <h4>{item.name}</h4>
                {(cardType === "character" && (
                    <>
                        <p>Gender: {capitalizeFirst(item.gender)}<br />
                            Hair color: {capitalizeFirst(item.hair_color)}<br />
                            Eye color: {capitalizeFirst(item.eye_color)}</p>
                    </>
                )) || (cardType === "vehicle" && (
                    <>
                        <p>Passengers: {capitalizeFirst(item.passengers)}<br />
                            Cost in credits: {capitalizeFirst(item.cost_in_credits)}</p>
                    </>
                )) || (cardType === "planet" && (
                    <>
                        <p>Population: {capitalizeFirst(item.population)}<br />
                            Terrain: {capitalizeFirst(item.terrain)}</p>
                    </>
                ))}
                <div className="d-flex align-items-center justify-content-between">
                    <button className="btn btn-outline-primary" onClick={handleClick}>Learn more</button>
                    <button className={isFavorite ? "btn btn-warning" : "btn btn-outline-warning"}
                        onClick={() => isFavorite ? removeFavorite(item) : addFavorite(item)}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};