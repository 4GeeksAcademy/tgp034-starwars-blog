import { Link } from "react-router-dom";
import starwars50 from "../assets/img/starwars50.svg";
import { useStarWarsStore } from "../hooks/useStarWarsStore.jsx";
import { useNavigate } from "react-router-dom";
import Search from "./Search.jsx";
export const Navbar = () => {

	const { state: { favorites }, dispatch } = useStarWarsStore();
	const navigate = useNavigate();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid m-0 d-flex align-items-center justify-content-evenly">
				<button className="btn" onClick={() => navigate("/")}>
					<img src={starwars50} style={{ width: "75px" }}></img>
				</button>

				<div className="mx-1 w-50" style={{ minWidth: 200 }}>
					<Search />
				</div>

				<div className="ml-auto">
					<div className="dropdown">
						<a className="btn btn-primary px-3 py-2 dropdown-toggle fs-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
							<span className="px-2 ms-1 bg-secondary rounded-1">{favorites.length}</span>
						</a>
						<ul className="dropdown-menu">
							{console.log(favorites)}
							{favorites.length > 0 ? (
								favorites.map((item) => (
									<li className="d-flex" key={item._id + item.name}>
										<Link className="dropdown-item"
											to={`/details/${(item.name)}`}
											state={{ item }}>
											{item.name}
										</Link>
										<button className="btn">
											<i className="fa-regular fa-trash-can "
												onClick={() => {
													console.log("Removing favorite:", item);
													dispatch({ type: "REMOVE_FAVORITE", payload: item });
												}}></i>
										</button>
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