import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: La variable DATABASE_URL no está configurada en .env");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const migrate = async () => {
  try {
    const sql = readFileSync('./migrations/001_init.sql', 'utf-8');
    await pool.query(sql);
  } catch (err) {
    console.error("❌ Error ejecutando migraciones:", err);
  } finally {
    await pool.end();
  }
};

migrate();
