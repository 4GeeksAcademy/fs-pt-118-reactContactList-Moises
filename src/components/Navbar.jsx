import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid d-flex justify-content-end me-4">
				<div className="ml-auto">
					<Link to={"/agregarcontacto"}>
						<button className="btn btn-success">Agregar Contacto</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};