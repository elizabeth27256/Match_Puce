// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Importar rutas API
import registroRuta from './routes/register.js';
import loginRuta from './routes/login.js';
import horariosRuta from './routes/schedules.js';
import coincidenciasRuta from './routes/coincidences.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Rutas API
app.use('/api', registroRuta);
app.use('/api', loginRuta);
app.use('/api', horariosRuta);
app.use('/api/coincidences', coincidenciasRuta);

// Configuración de paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir frontend de React en producción
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendPath));

  // Para cualquier ruta que no sea de API, devolver el index.html de React
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
