import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LocalForm() {
  const navigate = useNavigate();
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  const [horarios, setHorarios] = useState(() =>
    dias.reduce((acc, dia) => ({ ...acc, [dia]: { entrada: "", salida: "", activo: false } }), {})
  );
  const [sector, setSector] = useState("");
  const [resultado, setResultado] = useState({ mensaje: "", tipo: "", tabla: "" });
  const [esEdicion, setEsEdicion] = useState(false);

  // Verificar si el usuario ya tiene horarios
  useEffect(() => {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      navigate("/");
      return;
    }

    const forzar = localStorage.getItem("forzarHorario") === "1";
    if (!forzar) {
      (async () => {
        try {
          const API = "http://localhost:5000/api";
          const resp = await fetch(`${API}/horarios/${usuario_id}`);
          const info = await resp.json();
          
          // Si ya tiene horarios y no es forzado, redirigir a coincidencias
          if (info.existe) {
            navigate("/catalog");
            return;
          }
        } catch (e) {
          console.error("No se pudo verificar horarios:", e);
        }
      })();
    } else {
      localStorage.removeItem("forzarHorario");
      // Cargar horarios existentes para edición
      (async () => {
        try {
          const API = "http://localhost:5000/api";
          const resp = await fetch(`${API}/horarios-completos/${usuario_id}`);
          const data = await resp.json();
          
          if (data.horarios && data.horarios.length > 0) {
            // Cargar horarios existentes en el estado
            const horariosExistentes = {};
            let sectorExiste = "";
            
            data.horarios.forEach(h => {
              horariosExistentes[h.dia] = {
                entrada: h.hora_entrada,
                salida: h.hora_salida,
                activo: true
              };
              if (!sectorExiste) sectorExiste = h.sector;
            });
            
            setHorarios(prev => ({
              ...prev,
              ...horariosExistentes
            }));
            setSector(sectorExiste);
            setEsEdicion(true);
          }
        } catch (e) {
          console.error("No se pudieron cargar horarios existentes:", e);
        }
      })();
    }
  }, [navigate]);

  // Activar o desactivar dia
  const toggleHorario = (dia) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], activo: !prev[dia].activo },
    }));
  };

  // Cambio de hora de entrada o salida
  const handleChangeHora = (dia, campo, valor) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [campo]: valor },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let algunoMarcado = false;
    let error = false;
    const horariosValidos = {};

    dias.forEach((dia) => {
      if (horarios[dia].activo) {
        algunoMarcado = true;
        const { entrada, salida } = horarios[dia];
        if (!entrada || !salida) error = true;
        else horariosValidos[dia] = { entrada, salida };
      }
    });

    if (!algunoMarcado) {
      setResultado({
        mensaje: "Selecciona al menos un día y completa los horarios.",
        tipo: "warning",
        tabla: "",
      });
      return;
    }

    if (error) {
      setResultado({
        mensaje: "Por favor, completa las horas de entrada y salida para los días seleccionados.",
        tipo: "warning",
        tabla: "",
      });
      return;
    }

    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      setResultado({
        mensaje: "No se ha iniciado sesión. Por favor, inicia sesión primero.",
        tipo: "danger",
        tabla: "",
      });
      return;
    }

    const payload = { horarios: horariosValidos, sector, usuario_id };

    try {
      const API = "http://localhost:5000/api";
      const res = await fetch(`${API}/horarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        navigate("/catalog");
      } else {
        setResultado({ mensaje: result.mensaje || "Error al guardar horarios.", tipo: "warning", tabla: "" });
      }
    } catch (err) {
      setResultado({ mensaje: "No se pudo conectar al servidor.", tipo: "danger", tabla: "" });
    }
  };

  const handleCerrar = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* HEADER igual al de Catalog */}
      <header className="encabezado">
        <h1 className="logo">MatchPUCE</h1>
        <button className="btn-cerrar" onClick={handleCerrar}>
          Cerrar sesión
        </button>
      </header>

      {/* CONTENIDO DEL FORMULARIO */}
      <div className="registro-horarios container mt-4">
        <h2>{esEdicion ? "Editar Horarios" : "Registra tus Horarios"}</h2>
        <div className="card shadow">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {dias.map((dia) => (
                <div className="form-check mb-2" key={dia}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={dia}
                    checked={horarios[dia].activo}
                    onChange={() => toggleHorario(dia)}
                  />
                  <label className="form-check-label" htmlFor={dia}>
                    {dia.charAt(0).toUpperCase() + dia.slice(1)}
                  </label>

                  <div className={`row g-2 mt-1 ms-3 ${horarios[dia].activo ? "show" : ""}`}>
                    <div className="col">
                      <label className="form-label">Hora de entrada</label>
                      <input
                        type="time"
                        className="form-control"
                        value={horarios[dia].entrada}
                        onChange={(e) => handleChangeHora(dia, "entrada", e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">Hora de salida</label>
                      <input
                        type="time"
                        className="form-control"
                        value={horarios[dia].salida}
                        onChange={(e) => handleChangeHora(dia, "salida", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mb-3">
                <label className="form-label">Selecciona sector:</label>
                <select
                  className="form-select"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  required
                >
                  <option value="">Selecciona tu sector</option>
                  <optgroup label="Centro de Quito">
                    <option value="Centro Histórico">Centro Histórico</option>
                    <option value="San Marcos">San Marcos</option>
                    <option value="La Marín">La Marín</option>
                    <option value="Itchimbía">Itchimbía</option>
                    <option value="El Tejar">El Tejar</option>
                    <option value="El Panecillo">El Panecillo</option>
                  </optgroup>
                  <optgroup label="Norte de Quito">
                    <option value="La Carolina">La Carolina</option>
                    <option value="Iñaquito">Iñaquito</option>
                    <option value="El Inca">El Inca</option>
                    <option value="Kennedy">Kennedy</option>
                    <option value="Jipijapa">Jipijapa</option>
                    <option value="Cotocollao">Cotocollao</option>
                    <option value="Carcelén">Carcelén</option>
                    <option value="El Condado">El Condado</option>
                  </optgroup>
                  <optgroup label="Sur de Quito">
                    <option value="Chimbacalle">Chimbacalle</option>
                    <option value="Solanda">Solanda</option>
                    <option value="El Recreo">El Recreo</option>
                    <option value="La Magdalena">La Magdalena</option>
                    <option value="Quitumbe">Quitumbe</option>
                    <option value="El Calzado">El Calzado</option>
                    <option value="San Bartolo">San Bartolo</option>
                    <option value="La Ecuatoriana">La Ecuatoriana</option>
                  </optgroup>
                  <optgroup label="Valles y Periferia Urbana">
                    <option value="Cumbayá">Cumbayá</option>
                    <option value="Valle de los Chillos">Valle de los Chillos</option>
                    <option value="Tumbaco">Tumbaco</option>
                    <option value="Puembo">Puembo</option>
                    <option value="Conocoto">Conocoto</option>
                    <option value="Sangolquí">Sangolquí</option>
                    <option value="San Rafael">San Rafael</option>
                    <option value="Nayón">Nayón</option>
                  </optgroup>
                </select>
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  {esEdicion ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>

            {resultado.mensaje && (
              <div
                className={`alert alert-${resultado.tipo} mt-4`}
                dangerouslySetInnerHTML={{
                  __html: `<strong>${resultado.mensaje}</strong> ${resultado.tabla || ""}`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
