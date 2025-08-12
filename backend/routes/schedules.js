import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/horarios', async (req, res) => {
  const { horarios, sector, usuario_id } = req.body;

  if (!horarios || !sector || !usuario_id) {
    return res.status(400).json({ mensaje: 'Faltan datos necesarios.' });
  }

  const dias = Object.keys(horarios);
  const valores = [];

  for (const dia of dias) {
    const { entrada, salida } = horarios[dia];
    if (!entrada || !salida) continue;

    valores.push({
      dia,
      entrada,
      salida,
      sector,
      usuario_id
    });
  }

  try {
    for (const item of valores) {
      await db.query(
        `INSERT INTO horarios (dia, hora_entrada, hora_salida, sector, usuario_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [item.dia, item.entrada, item.salida, sector, item.usuario_id]
      );
    }

    res.status(201).json({ mensaje: 'Horarios guardados correctamente.' });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar horarios.', error: error.message });
  }
});

router.get('/horarios/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const { rows } = await db.query(
      'SELECT 1 FROM horarios WHERE usuario_id = $1 LIMIT 1',
      [usuario_id]
    );
    res.json({ existe: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al verificar horarios', error: err.message });
  }
});

export default router;