import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleCerrar = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="encabezado">
      <h1 className="logo">MatchPUCE</h1>
      <button className="btn-cerrar" onClick={handleCerrar}>
        Cerrar sesión
      </button>
    </header>
  );
}