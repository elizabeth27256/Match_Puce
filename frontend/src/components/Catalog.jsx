import React from "react";
import { useNavigate } from "react-router-dom";

export default function Catalog() {
  const navigate = useNavigate();
  const coincidencias = []; // Aquí iría la lógica de coincidencias

  return (
    <div>
      <header className="encabezado">
        <h1 className="logo">MatchPUCE</h1>
        <button className="btn-cerrar" onClick={() => navigate("/")}>
          Cerrar sesión
        </button>
      </header>

      <h2>Coincidencias de Horarios</h2>
      <div className="cartas-container">
        {coincidencias.length === 0 ? (
          <p>No se registran coincidencias</p>
        ) : (
          coincidencias.map((c, i) => (
            <div className="carta" key={i}>
              <p>{c}</p>
            </div>
          ))
        )}
      </div>

      <div className="text-center">
        <button className="btn-horario" onClick={() => navigate("/local-form")}>
          Registrar nuevo horario
        </button>
      </div>
    </div>
  );
}
