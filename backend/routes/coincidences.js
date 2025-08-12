import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const { rows: horariosUsuario } = await db.query(
      `SELECT dia, hora_entrada, hora_salida, sector FROM horarios WHERE usuario_id = $1`,
      [usuario_id]
    );

    if (!horariosUsuario.length) {
      return res.status(404).json({ mensaje: 'No se encontraron horarios del usuario.' });
    }

    const coincidencias = [];

    for (const horario of horariosUsuario) {
      const { dia, hora_entrada, hora_salida, sector } = horario;

      const { rows: similares } = await db.query(
        `SELECT u.usuario, u.nombres, u.cedula, u.telefono, h.sector
         FROM horarios h
         JOIN usuarios u ON h.usuario_id = u.id
         WHERE h.usuario_id != $1
         AND h.dia = $2
         AND h.hora_entrada = $3
         AND h.hora_salida = $4
         AND h.sector = $5`,
        [usuario_id, dia, hora_entrada, hora_salida, sector]
      );

      similares.forEach(user => coincidencias.push(user));
    }

    if (coincidencias.length === 0) {
      return res.json({ coincidencias: [] });
    }

    res.json({ coincidencias });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener coincidencias', error: error.message });
  }
});

export default router;
