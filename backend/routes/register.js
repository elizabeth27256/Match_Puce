import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/registrar', async (req, res) => {
  const { nombres, cedula, correo, telefono, usuario, contrasena, repetirContrasena } = req.body;

  if (!correo.endsWith('@puce.edu.ec')) {
    return res.status(400).json({ mensaje: 'Correo debe tener el dominio @puce.edu.ec' });
  }
  if (contrasena.length < 8) {
    return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 8 caracteres' });
  }
  if (contrasena !== repetirContrasena) {
    return res.status(400).json({ mensaje: 'Las contraseñas no coinciden' });
  }
  if (!nombres || !cedula || !correo || !telefono || !usuario || !contrasena || !repetirContrasena) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }
  if (cedula.length !== 10 || isNaN(cedula)) {
    return res.status(400).json({ mensaje: 'Cédula debe tener 10 dígitos y ser numérica' });
  }
  if (telefono.length < 10 || isNaN(telefono)) {
    return res.status(400).json({ mensaje: 'Teléfono debe tener al menos 10 dígitos y ser numérico' });
  }

  try {
    const checkExist = await db.query(
      `SELECT * FROM usuarios 
       WHERE nombres = $1 OR cedula = $2 OR correo = $3 OR usuario = $4`,
      [nombres, cedula, correo, usuario]
    );

    if (checkExist.rows.length > 0) {
      const existente = checkExist.rows[0];

      if (existente.nombres === nombres) {
        return res.status(400).json({ mensaje: 'El nombre ya está registrado' });
      }
      if (existente.cedula === cedula) {
        return res.status(400).json({ mensaje: 'La cédula ya está registrada' });
      }
      if (existente.correo === correo) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado' });
      }
      if (existente.usuario === usuario) {
        return res.status(400).json({ mensaje: 'El nombre de usuario ya está en uso' });
      }
    }

    const resultado = await db.query(
      `INSERT INTO usuarios 
      (nombres, cedula, correo, telefono, usuario, contrasena)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nombres, cedula, correo, telefono, usuario, contrasena]
    );

    res.status(201).json({
      mensaje: 'Usuario registrado con éxito',
      usuario: resultado.rows[0]
    });

  } catch (err) {
    res.status(500).json({ mensaje: 'Error en el registro', error: err.message });
  }
});

export default router;
