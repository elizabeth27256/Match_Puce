import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/catalog">Coincidencias</Link></li>
        <li><Link to="/schedules-list">Horarios</Link></li>
      </ul>
    </nav>
  );
}