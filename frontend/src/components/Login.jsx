import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

export default function Login() {
  // Estados para usuario, contraseña y error
  const [usuario, setUsuario] = useState("");
  const [contrasena, setClave] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena: contrasena }),
      });

      const data = await res.json();

      if (res.ok) {
        // Guarda datos en localStorage
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("usuario_id", data.usuario.id);

        // Verificar si el usuario ya tiene horarios registrados
        try {
          const horariosRes = await fetch(`http://localhost:5000/api/horarios/${data.usuario.id}`);
          const horariosData = await horariosRes.json();

          if (horariosData.existe) {
            // Si ya tiene horarios, ir directo a coincidencias
            navigate("/catalog");
          } else {
            // Si no tiene horarios, ir a registro de horarios
            navigate("/local-form");
          }
        } catch (err) {
          // Si hay error al verificar, ir a registro de horarios por defecto
          navigate("/local-form");
        }
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <>
      {/* Franja blanca con el logo */}
      <header className="encabezado">
        <h1 className="logo">MatchPUCE</h1>
      </header>

      <form id="loginForm" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        {error && <div className="error show">{error}</div>}

        <div className="campo">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>

        <button type="submit">Ingresar</button>

        <div className="registro-link">
          ¿No tienes cuenta?{" "}
          <Link to="/register">Registrar usuario</Link>
        </div>
      </form>
    </>
  );
}
