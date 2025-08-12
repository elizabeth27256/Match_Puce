import React, { useEffect, useState } from "react";

export default function Catalog() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/catalog")
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Coincidencias de Horarios</h2>
      {matches.length > 0 ? (
        <div>
          {matches.map((match, idx) => (
            <div key={idx} className="card">
              <h3 title={match.nombre_completo}>{match.username}</h3>
              <p>Cédula: {match.cedula}</p>
              <p>Sector: {match.sector}</p>
              <p>Teléfono: {match.telefono}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay coincidencias</p>
      )}
    </div>
  );
}
