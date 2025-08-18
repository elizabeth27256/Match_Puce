import { readFileSync } from 'fs';
import pkg from 'pg';
import { dbConfig } from '../backend/db.js';

const { Pool } = pkg;

const pool = new Pool(dbConfig);

const migrate = async () => {
  try {
    console.log("🔄 Iniciando migración de la base de datos...");
    
    // Crear base de datos si no existe
    const adminPool = new Pool({
      user: dbConfig.user,
      host: dbConfig.host,
      database: "postgres",
      password: dbConfig.password,
      port: dbConfig.port,
      ssl: dbConfig.ssl
    });
    
    try {
      await adminPool.query('CREATE DATABASE match_puce');
      console.log("✅ Base de datos 'match_puce' creada exitosamente");
    } catch (err) {
      if (err.code === '42P04') {
        console.log("ℹ️  La base de datos 'match_puce' ya existe");
      } else {
        console.error("❌ Error creando base de datos:", err.message);
      }
    } finally {
      await adminPool.end();
    }
    
    // Ejecutar migraciones
    const sql = readFileSync('./migrations/001_init.sql', 'utf-8');
    await pool.query(sql);
    console.log("✅ Migraciones ejecutadas exitosamente");
    
  } catch (err) {
    console.error("❌ Error ejecutando migraciones:", err);
  } finally {
    await pool.end();
  }
};

migrate();
