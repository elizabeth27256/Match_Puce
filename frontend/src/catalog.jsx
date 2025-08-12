import React, { useEffect, useState } from 'react';
import './Catalog.css';

export default function Catalog() {
  const [coincidencias, setCoincidencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/coincidencias');
        const data = await res.json();
        setCoincidencias(data);
      } catch (err) {
        console.error('Error cargando coincidencias:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="catalog-container">
      <h2>Coincidencias de Horarios</h2>
      <div className="cards-grid">
        {coincidencias.length === 0 ? (
          <p>No hay coincidencias</p>
        ) : (
          coincidencias.map((c, idx) => (
            <div className="card" key={idx}>
              <h3 title={c.nombreCompleto}>{c.usuario}</h3>
              <p><strong>Cédula:</strong> {c.cedula}</p>
              <p><strong>Sector:</strong> {c.sector}</p>
              <p><strong>Teléfono:</strong> {c.telefono}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
