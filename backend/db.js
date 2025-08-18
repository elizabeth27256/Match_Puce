import pg from "pg";

export const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "match_puce",
  password: "cris123",
  port: 5432,
  ssl: false
};

const pool = new pg.Pool(dbConfig);

export default pool;
