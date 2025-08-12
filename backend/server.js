import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;

// Validar que la variable exista
if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: La variable DATABASE_URL no está configurada en .env");
    process.exit(1);
}

// Configuración de conexión
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false // Desactivar SSL en local
});

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar DB
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'ok', time: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error conectando a la DB' });
    }
});

// Aquí van las rutas reales de tu API...
// Ejemplo:
app.get('/', (req, res) => {
    res.send('API funcionando en local 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
