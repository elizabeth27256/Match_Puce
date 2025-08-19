// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';

// Importar rutas API
import registroRuta from './routes/register.js';
import loginRuta from './routes/login.js';
import horariosRuta from './routes/schedules.js';
import coincidenciasRuta from './routes/coincidences.js';

const app = express();

// Configurar CORS para permitir solo el frontend de Render
const allowedOrigins = [
  'https://match-puce-1.onrender.com',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());

// Rutas API
app.use('/api', registroRuta);
app.use('/api', loginRuta);
app.use('/api', horariosRuta);
app.use('/api/coincidences', coincidenciasRuta);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
