import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import LocalForm from "./components/LocalForm";
import Catalog from "./components/Catalog";
import Navbar from "./components/Navbar";
import "./index.css";

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {/*Menu de navegacion*/}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/local-form" element={<LocalForm />} />
        <Route path="/catalog" element={<Catalog />} />
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
