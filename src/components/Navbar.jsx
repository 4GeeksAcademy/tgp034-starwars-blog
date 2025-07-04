import { Link } from "react-router-dom";
import starwars50 from "../assets/img/starwars50.svg";
import { useStarWarsStore } from "../hooks/useStarWarsStore.jsx";
export const Navbar = () => {

	const { state: { favorites } } = useStarWarsStore();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<img src={starwars50} style={{ width: "75px" }}></img>
				<div className="ml-auto">
					<div className="dropdown">
						<a className="btn btn-primary px-3 py-2 dropdown-toggle fs-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
							<span className="px-2 ms-1 bg-secondary rounded-1">{favorites.length}</span>
						</a>
						<ul className="dropdown-menu">
							{favorites.length > 0 ? (
								favorites.map((item) => (
									<li key={item._id + item.name}>
										<Link className="dropdown-item" to={`/details/${item._id}`}>
											{item.name}
										</Link>
									</li>
								))
							) : (
								<li>
									<span className="dropdown-item">No favorites added yet</span>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};