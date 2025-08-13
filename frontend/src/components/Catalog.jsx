// src/components/Catalog.jsx
import React, { useEffect, useState } from "react";

export default function Catalog() {
  const [coincidencias, setCoincidencias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchCoincidencias = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/coincidencias", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setCoincidencias(data);
          if (data.length === 0) {
            setMensaje("No se registran coincidencias.");
          }
        } else {
          setMensaje(data.error || "Error al obtener coincidencias.");
        }
      } catch (err) {
        setMensaje("No se pudo conectar al servidor.");
      }
    };
    fetchCoincidencias();
  }, []);

  return (
    <div className="container">
      <h2>Coincidencias de Horarios</h2>
      {mensaje && <p>{mensaje}</p>}
      <div className="cards">
        {coincidencias.map((c, idx) => (
          <div className="card" key={idx}>
            <h3>{c.usuario}</h3>
            <p><strong>Cédula:</strong> {c.cedula}</p>
            <p><strong>Sector:</strong> {c.sector}</p>
            <p><strong>Teléfono:</strong> {c.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
