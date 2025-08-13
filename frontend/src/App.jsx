import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import LocalForm from "./components/LocalForm";
import Catalog from "./components/Catalog";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/local-form" element={<LocalForm />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </Router>
  );
}
