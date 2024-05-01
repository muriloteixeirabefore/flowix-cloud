'use server'

import { pool } from '@/lib/mysql'
import { RowDataPacket } from 'mysql2'

const query = `SELECT value FROM settings s WHERE s.key = 'AllowedIPs';`

type Ip = string

export async function getDbIps(): Promise<Ip[]> {
  const [result] = await pool.query<RowDataPacket[]>(query)
  return result[0].value
}

export async function addIps(ips: Ip[]): Promise<void> {
  await pool.query<RowDataPacket[]>(
    `UPDATE settings s SET value = ?, updated_at = NOW() WHERE s.key = 'AllowedIPs';`,
    [JSON.stringify(ips)],
  )
}
