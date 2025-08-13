import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;

// Validar que la variable exista
if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: La variable DATABASE_URL no está configurada en .env");
    process.exit(1);
}

// Configurar conexión
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

const migrate = async () => {
    try {
        console.log("Ejecutando migraciones...");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS horarios (
                id SERIAL PRIMARY KEY,
                usuario_id INTEGER NOT NULL,
                dia VARCHAR(50) NOT NULL,
                hora_entrada TIME NOT NULL,
                hora_salida TIME NOT NULL,
                sector VARCHAR(100) NOT NULL
            );
        `);

        console.log("✅ Migraciones ejecutadas con éxito.");
    } catch (err) {
        console.error("❌ Error ejecutando migraciones:", err);
    } finally {
        await pool.end();
    }
};

migrate();
