import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/catalog">Catálogo</Link></li>
        <li><Link to="/local-form">Horarios</Link></li>
      </ul>
    </nav>
  );
}