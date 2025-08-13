import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "catalogo",
  password: "1234",
  port: 5432,
  ssl: false
});

export default pool;
