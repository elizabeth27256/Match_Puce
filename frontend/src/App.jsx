import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import LocalForm from "./components/LocalForm";
import Catalog from "./components/Catalog";
import Navbar from "./components/Navbar";
import SchedulesList from "./components/SchedulesList";
import Header from "./components/Header";
import "./index.css";

function AppRoutes() {
  const location = useLocation();
  const hideNavAndHeader = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavAndHeader && <Header />}
      {!hideNavAndHeader && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/local-form" element={<LocalForm />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/schedules-list" element={<SchedulesList />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
