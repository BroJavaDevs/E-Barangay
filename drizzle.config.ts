import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/drizzle/migrations/schema.ts",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    host: 'auth-db1237.hstgr.io',
    user: 'u943563710_barangay82',
    password: '@Barangay82',
    database: 'u943563710_barangay82',
    port: 3306
  }
});