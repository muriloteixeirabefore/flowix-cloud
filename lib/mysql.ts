import mysql from 'mysql2/promise'
import { env } from '@/env'

export const pool = mysql.createPool({
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  password: env.DB_PASSWORD,
  port: parseInt(env.DB_PORT),
  user: env.DB_USER,
})
