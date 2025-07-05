import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStarWarsStore } from "../hooks/useStarWarsStore";
export const ConditionalCard = ({ cardType, item }) => {

    const navigate = useNavigate();

    function capitalizeFirst(str = "") {
        if (str === "n/a") return "N/A";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /*
    const context = useStarWarsStore();
    const favorites = context.state.favorites;
    const dispatch = context.dispatch;
    */
    const { state: { favorites }, dispatch } = useStarWarsStore();
    
    const handleClick = () => {
        navigate('/details/' + item.name, {state: { item } });
    }

    const addFavorite = () => {
        if (favorites.some(f => f.id === item.id)) {
            dispatch({ type: "REMOVE_FAVORITE", payload: item });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: item });
        };
    }

    return (
        <div className="border border-1 rounded-2 m-2" style={{ width: "401px" }}>
            <img className="rounded-top-2" src="https://dz2cdn1.dzone.com/storage/temp/13989967-400x200" alt="Img not available" />
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
                    <button className={favorites.some(f => f.id === item.id) ? "btn btn-warning" :"btn btn-outline-warning"} onClick={addFavorite}><i className="fa-regular fa-heart"></i></button>
                </div>
            </div>
        </div>
    );
};