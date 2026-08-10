import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.PGURI,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Unexpected database error", err);
  process.exit(-1);
});

export default pool;

// import * as sqlite from "sqlite";
// import type { Database } from "sqlite";
// import sqlite3 from "sqlite3";

// export let database: Database;

// database = await sqlite.open({
//   driver: sqlite3.Database,
//   filename: "recipes.sqlite",
// });

// await database.run("PRAGMA foreign_keys = ON");
