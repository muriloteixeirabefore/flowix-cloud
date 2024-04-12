'use server'

import { pool } from '@/lib/mysql';
import { RowDataPacket } from 'mysql2';

interface Area {
  id: number
  nome: string
}

export async function getAreas(): Promise<Area[]> {
  try {
    const [ rows ] = await pool.query<RowDataPacket[]>('SELECT * FROM area LIMIT 10');
    return rows.map((row) => {
      return {
        id: row.id,
        nome: row.nome
      }
    }
    )
  } catch (error) {
    console.error('Erro ao obter áreas:', error);
    throw error
  }
}