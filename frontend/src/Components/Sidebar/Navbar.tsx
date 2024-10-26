import { Link, useMatch } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <h1>Restaurante</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/reservations/new"
                  className={`nav-link ${
                    useMatch({ path: "/reservations/new", end: true })
                      ? "active"
                      : ""
                  }`}
                >
                  Nova Reserva
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/menuItems/list"
                  className={`nav-link ${
                    useMatch({ path: "/menuItems/list", end: true })
                      ? "active"
                      : ""
                  }`}
                >
                  Consultar cardápio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
