import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCerrar = () => {
    localStorage.clear();
    navigate("/");
  };

  // Ocultar botón en el Login y Registro de usuario
  const ocultarBoton = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="encabezado">
      <h1 className="logo">MatchPUCE</h1>
      {!ocultarBoton && (
        <button className="btn-cerrar" onClick={handleCerrar}>
          Cerrar sesión
        </button>
      )}
    </header>
  );
}
