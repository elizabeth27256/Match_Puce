import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const API = "http://localhost:5000/api";

export default function Catalog() {
  const navigate = useNavigate();
  const [coincidencias, setCoincidencias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      navigate("/"); // Redirige si no hay usuario
      return;
    }

    const cargarCoincidencias = async () => {
      try {
        const resp = await fetch(`${API}/coincidences/${usuario_id}`);
        const data = await resp.json();

        if (Array.isArray(data.coincidencias) && data.coincidencias.length > 0) {
          setCoincidencias(data.coincidencias);
          setMensaje("");
        } else {
          setCoincidencias([]);
          setMensaje("No se registran coincidencias.");
        }
      } catch (error) {
        console.error(error);
        setCoincidencias([]);
        setMensaje("Error al cargar las coincidencias.");
      }
    };

    cargarCoincidencias();
  }, [navigate]);

  const handleCerrar = () => {
    localStorage.removeItem("forzarHorario");
    localStorage.clear();
    navigate("/");
  };

  const handleNuevoHorario = () => {
    localStorage.setItem("forzarHorario", "1");
    navigate("/local-form");
  };

  return (
    <>
      <Header />
      <div className="cartas-container">
        <h2 className="catalog-titulo">Coincidencias de Horarios</h2>

        {coincidencias.length > 0 ? (
          coincidencias.map((c, idx) => (
            <div key={idx} className="carta">
              <h3>{c.nombres}</h3>
              <p><strong>Usuario:</strong> {c.usuario}</p>
              <p><strong>Cédula:</strong> {c.cedula}</p>
              <p><strong>Teléfono:</strong> {c.telefono}</p>
              <p><strong>Sector:</strong> {c.sector}</p>
            </div>
          ))
        ) : (
          <p id="mensaje">{mensaje}</p>
        )}
      </div>
      
      <div className="text-center" style={{ marginTop: 16 }}>
        <button className="btn-horario" onClick={handleNuevoHorario}>
          Registrar nuevo horario
        </button>
      </div>
    </>
  );
}

