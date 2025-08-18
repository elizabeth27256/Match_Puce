import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

export default function SchedulesList() {
  const [horarios, setHorarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      navigate("/");
      return;
    }
    fetch(`${API}/horarios-completos/${usuario_id}`)
      .then(res => res.json())
      .then(data => {
        if (data.horarios && data.horarios.length > 0) {
          setHorarios(data.horarios);
        } else {
          setMensaje("No existen horarios registrados");
        }
      })
      .catch(() => setMensaje("Error al cargar horarios"));
  }, [navigate]);

  const eliminarHorario = async (dia, hora_entrada, hora_salida, sector) => {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) return;
    const res = await fetch(`${API}/horarios`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id, dia, hora_entrada, hora_salida, sector }),
    });
    if (res.ok) {
      setHorarios(horarios.filter(
        h => !(h.dia === dia && h.hora_entrada === hora_entrada && h.hora_salida === hora_salida && h.sector === sector)
      ));
      if (horarios.length === 1) setMensaje("No existen horarios registrados");
    } else {
      setMensaje("No se pudo eliminar el horario");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mis Horarios Registrados</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      {horarios.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Sector</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((h, idx) => (
              <tr key={idx}>
                <td>{h.dia}</td>
                <td>{h.hora_entrada}</td>
                <td>{h.hora_salida}</td>
                <td>{h.sector}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarHorario(h.dia, h.hora_entrada, h.hora_salida, h.sector)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}