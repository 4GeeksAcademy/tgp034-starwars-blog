import { useStarWarsStore } from "../hooks/useStarWarsStore.jsx";
import { ConditionalCard } from "../components/ConditionalCard.jsx";
export const Home = () => {

	const {
		state: { characters, planets, vehicles },
	} = useStarWarsStore();

	const isLoading =
		characters.length === 0 ||
		planets.length === 0 ||
		vehicles.length === 0;

	if (isLoading) return <p>Cargando datos...</p>;

	return (
		<div className="container-fluid p-5">
			<h1 className="text-danger ps-3">Characters</h1>
			<div className="d-flex overflow-auto align-items-center justify-content-start flex-nowrap gap-5 mb-5">
				{characters.map((char) => (
					<div key={char._id + char.name}>
						<ConditionalCard cardType="character" item={char} />
					</div>
				))}
			</div>
			<h1 className="text-danger ps-3">Planets</h1>
			<div className="d-flex overflow-auto align-items-center justify-content-start flex-nowrap gap-5 mb-5">
				{planets.map((planet) => (
					<div key={planet._id + planet.name}>
						<ConditionalCard cardType="planet" item={planet} />
					</div>
				))}
			</div>
			<h1 className="text-danger ps-3">Vehicles</h1>
			<div className="d-flex overflow-auto align-items-center justify-content-start flex-nowrap gap-5 mb-5">
				{vehicles.map((vehicle) => (
					<div key={vehicle._id + vehicle.name}>
						<ConditionalCard cardType="vehicle" item={vehicle} />
					</div>
				))}
			</div>
		</div>
	);
}; 