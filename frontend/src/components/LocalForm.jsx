// src/components/LocalForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LocalForm() {
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [sector, setSector] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!entrada || !salida || !sector) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/local-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ entrada, salida, sector }),
      });

      if (res.ok) {
        navigate("/catalog");
      } else {
        const data = await res.json();
        setMensaje(data.error || "Error al guardar datos.");
      }
    } catch (err) {
      setMensaje("No se pudo conectar al servidor.");
    }
  };

  return (
    <div className="container">
      <h2>Datos para Coincidencias</h2>
      <form onSubmit={handleSave} className="form-box">
        <label>Hora de entrada:</label>
        <input
          type="time"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
        />
        <label>Hora de salida:</label>
        <input
          type="time"
          value={salida}
          onChange={(e) => setSalida(e.target.value)}
        />
        <label>Sector:</label>
        <select value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="">Seleccione un sector</option>
          <option value="Norte">Norte</option>
          <option value="Centro">Centro</option>
          <option value="Sur">Sur</option>
        </select>
        <button type="submit">Guardar</button>
      </form>
      {mensaje && <p className="mensaje-error">{mensaje}</p>}
    </div>
  );
}
