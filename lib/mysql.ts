import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'api-server-before.cdilck5zn3g0.us-east-1.rds.amazonaws.com',
  user: 'flowix_adm',
  password: '4X3MUW92PCEZ4',
  database: 'flowix',
  port: 3306,
})
  