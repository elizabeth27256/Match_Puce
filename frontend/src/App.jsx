import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Catalog from "./components/Catalog";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Registro</Link> | <Link to="/catalogo">Catálogo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/catalogo" element={<Catalog />} />
      </Routes>
    </Router>
  );
}
