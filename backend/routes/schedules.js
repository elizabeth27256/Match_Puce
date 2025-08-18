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
    // Inserta los nuevos horarios
    for (const v of valores) {
      await db.query(
        'INSERT INTO horarios (usuario_id, dia, hora_entrada, hora_salida, sector) VALUES ($1, $2, $3, $4, $5)',
        [v.usuario_id, v.dia, v.entrada, v.salida, v.sector]
      );
    }

    res.json({ mensaje: 'Horarios guardados correctamente.' });
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

// Nueva ruta para obtener horarios completos de un usuario
router.get('/horarios-completos/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const { rows } = await db.query(
      'SELECT dia, hora_entrada, hora_salida, sector FROM horarios WHERE usuario_id = $1 ORDER BY dia',
      [usuario_id]
    );
    res.json({ horarios: rows });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener horarios', error: err.message });
  }
});

router.delete('/horarios', async (req, res) => {
  const { usuario_id, dia, hora_entrada, hora_salida, sector } = req.body;
  if (!usuario_id || !dia || !hora_entrada || !hora_salida || !sector) {
    return res.status(400).json({ mensaje: 'Faltan datos para eliminar el horario.' });
  }
  try {
    await db.query(
      'DELETE FROM horarios WHERE usuario_id = $1 AND dia = $2 AND hora_entrada = $3 AND hora_salida = $4 AND sector = $5',
      [usuario_id, dia, hora_entrada, hora_salida, sector]
    );
    res.json({ mensaje: 'Horario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el horario.', error: error.message });
  }
});

export default router;