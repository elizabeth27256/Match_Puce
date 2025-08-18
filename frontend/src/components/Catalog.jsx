import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";


const API = "http://localhost:5000/api";

export default function Catalog() {
  const navigate = useNavigate();
  const [coincidencias, setCoincidencias] = useState([]);
  const [mensaje, setMensaje] = useState("");

// useEffect se ejecuta al cargar el componente
  useEffect(() => {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      navigate("/");
      return;
    }

// función para cargar las coincidencias desde el backend
    const cargar = async () => {
      try {
        const resp = await fetch(`${API}/coincidences/${usuario_id}`);
        const data = await resp.json();

        if (Array.isArray(data.coincidencias) && data.coincidencias.length > 0) {
          setCoincidencias(data.coincidencias);
          setMensaje("");
        } else {
          setCoincidencias([]);
          setMensaje("No se registran coincidencias");
        }
      } catch (e) {
        console.error(e);
        setCoincidencias([]);
        setMensaje("No se registran coincidencias");
      }
    };

    cargar();
  }, [navigate]);

  const handleCerrar = () => {
    localStorage.removeItem("forzarHorario");
    localStorage.clear();
    navigate("/");
  };

  const handleNuevoHorario = async () => {
    localStorage.setItem("forzarHorario", "1");
    navigate("/local-form");
  };

  return (
    <>
      <Header />

      <h2>Coincidencias de Horarios</h2>

      <div id="cartas" className="cartas-container">
        {coincidencias.map((c, idx) => (
          <div key={idx} className="carta">
            <p><strong>Usuario:</strong> {c.usuario}</p>
            <p><strong>Nombre:</strong> {c.nombres}</p>
            <p><strong>Cédula:</strong> {c.cedula}</p>
            <p><strong>Teléfono:</strong> {c.telefono}</p>
            <p><strong>Sector:</strong> {c.sector}</p>
          </div>
        ))}
      </div>

      {mensaje && <p id="mensaje">{mensaje}</p>}

      <div className="text-center" style={{ marginTop: 16 }}>
        <button className="btn-horario" onClick={handleNuevoHorario}>
          Registrar nuevo horario
        </button>
      </div>
    </>
  );
}
