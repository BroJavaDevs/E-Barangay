import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import * as schema from './migrations/schema'

const connection = mysql.createPool({
  host: import.meta.env.VITE_DB_HOST,
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASS,
  database: import.meta.env.VITE_DB_NAME,
  port: 3306
});

const db = drizzle(connection, { 
  schema,
  mode: "default",
  logger: false 
})

export  { db }