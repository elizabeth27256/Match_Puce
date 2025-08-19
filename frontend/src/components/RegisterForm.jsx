import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../index.css";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombres: "",
    cedula: "",
    correo: "",
    telefono: "",
    usuario: "",
    contrasena: "",
    repetirContrasena: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    // Validación previa en el frontend
    if (formData.contrasena !== formData.repetirContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombres: formData.nombres,
          cedula: formData.cedula,
          correo: formData.correo,
          telefono: formData.telefono,
          usuario: formData.usuario,
          contrasena: formData.contrasena,
          repetirContrasena: formData.repetirContrasena,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("Usuario registrado con éxito");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.mensaje || "Error al registrar usuario");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <>
      {/* 🔹 Franja blanca con logo, sin botón cerrar sesión */}
      <Header showLogout={false} />

      <div className="registro-container">
        <form className="form-registro" onSubmit={handleSubmit}>
          <h2>
            <i className="fas fa-user-plus"></i> Formulario de Registro PUCE
          </h2>

          {[
            ["nombres", "Nombres completos", "text", "fas fa-user"],
            ["cedula", "Cédula", "text", "fas fa-id-card"],
            ["correo", "Correo institucional (@puce.edu.ec)", "email", "fas fa-envelope"],
            ["telefono", "Teléfono", "tel", "fas fa-phone"],
            ["usuario", "Nombre de usuario", "text", "fas fa-user-circle"],
            ["contrasena", "Contraseña", "password", "fas fa-lock"],
            ["repetirContrasena", "Repetir contraseña", "password", "fas fa-lock"],
          ].map(([id, placeholder, type, icon]) => (
            <div className="campo" key={id}>
              <i className={icon}></i>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {error && <div className="error">{error}</div>}
          {mensaje && <div className="mensaje-exito">{mensaje}</div>}

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </>
  );
}
