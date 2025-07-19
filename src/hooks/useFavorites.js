import { useStarWarsStore } from "./useStarWarsStore";

export function useFavorites() {
    const { state, dispatch } = useStarWarsStore();
    const { favorites } = state;

    const addFavorite = (item) => {
        console.log("Adding favorite:", item);
        dispatch({ type: 'ADD_FAVORITE', payload: item });
    };

    const removeFavorite = (item) => {
        console.log("Removing favorite:", item);
        dispatch({ type: 'REMOVE_FAVORITE', payload: item });
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
    };
}