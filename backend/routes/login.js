import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const result = await db.query(
      'SELECT * FROM usuarios WHERE usuario = $1 AND contrasena = $2',
      [usuario, contrasena]
    );

    if (result.rows.length === 1) {
      res.json({ mensaje: "Login exitoso", usuario: result.rows[0] });
    } else {
      res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
  }
});

export default router;
