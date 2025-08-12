import React, { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    sector: '',
    horaEntrada: '',
    horaSalida: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Error al registrar');
      const data = await res.json();
      setMensaje(`Registro exitoso: ${data.message || ''}`);
    } catch (err) {
      console.error(err);
      setMensaje('Hubo un error al registrar');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="text" name="cedula" placeholder="Cédula" onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} required />
        <input type="text" name="sector" placeholder="Sector" onChange={handleChange} required />
        <input type="time" name="horaEntrada" onChange={handleChange} required />
        <input type="time" name="horaSalida" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
