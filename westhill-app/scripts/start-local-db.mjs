/**
 * start-local-db.mjs
 * Starts an embedded PostgreSQL instance for local development.
 * Run: node scripts/start-local-db.mjs
 */
import EmbeddedPostgres from "embedded-postgres";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "../.postgres-data");

const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: "postgres",
  password: "postgres",
  port: 5432,
  persistent: true,
});

console.log("Starting embedded PostgreSQL on port 5432...");

try {
  await pg.initialise();
  await pg.start();
  console.log("PostgreSQL started. Creating database if needed...");
  
  // Create the westhill_db database
  const client = pg.getPgClient();
  await client.connect();
  
  const result = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = 'westhill_db'"
  );
  
  if (result.rowCount === 0) {
    await client.query("CREATE DATABASE westhill_db");
    console.log("Created database: westhill_db");
  } else {
    console.log("Database westhill_db already exists.");
  }
  
  await client.end();
  console.log("Embedded PostgreSQL is running on localhost:5432");
  console.log("Press Ctrl+C to stop.");
  
  process.on("SIGINT", async () => {
    console.log("\nStopping PostgreSQL...");
    await pg.stop();
    process.exit(0);
  });
  
  // Keep process alive
  await new Promise(() => {});
} catch (err) {
  console.error("Failed to start embedded PostgreSQL:", err);
  process.exit(1);
}
