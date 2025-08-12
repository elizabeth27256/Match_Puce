CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombres TEXT NOT NULL,
  cedula VARCHAR(10) UNIQUE NOT NULL,
  correo TEXT UNIQUE NOT NULL CHECK (correo LIKE '%@puce.edu.ec'),
  telefono TEXT NOT NULL,
  usuario TEXT UNIQUE NOT NULL,
  contrasena TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS horarios (
  id SERIAL PRIMARY KEY,
  dia VARCHAR(10) NOT NULL,
  hora_entrada TIME NOT NULL,
  hora_salida TIME NOT NULL,
  sector VARCHAR(100) NOT NULL,
  usuario_id INTEGER NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
