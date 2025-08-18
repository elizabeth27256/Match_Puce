import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "catalogo",
  password: "cris123",
  port: 5432,
  ssl: false
});

export default pool;

