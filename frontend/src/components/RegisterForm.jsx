import React, { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    cedula: "",
    sector: "",
    telefono: "",
    horaEntrada: "",
    horaSalida: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Registro exitoso ✅");
        setFormData({
          username: "",
          cedula: "",
          sector: "",
          telefono: "",
          horaEntrada: "",
          horaSalida: "",
        });
      } else {
        alert("Error al registrar ❌");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="cedula"
          placeholder="Cédula"
          value={formData.cedula}
          onChange={handleChange}
          required
        />
        <input
          name="sector"
          placeholder="Sector"
          value={formData.sector}
          onChange={handleChange}
          required
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="horaEntrada"
          value={formData.horaEntrada}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="horaSalida"
          value={formData.horaSalida}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
