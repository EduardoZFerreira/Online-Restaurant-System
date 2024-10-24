import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="navbar">
        <Link to="/" className="title">
          <h1>Restaurante</h1>
        </Link>
        <ul>
          <li>
            <Link to="/reservations/new">Nova Reserva</Link>
          </li>
          <li>
            <Link to="/menuItems/list">Consultar cardápio</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
