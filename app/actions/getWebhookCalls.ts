'use server'

import { pool } from '@/lib/mysql'
import { RowDataPacket } from 'mysql2'

const query = `
SELECT 
ciw.id, ciw.request_id, ciw.\`action\`, ciw.body, ciw.url, ciw.http_metodo, ciw.proxima_tentativa, ciw.created_at, ciw.fk_app, app.nome as app_nome
FROM chamada_integracao_webhook ciw
INNER JOIN app ON ciw.fk_app = app.id
WHERE ciw.status = 'QUEUE'
order by proxima_tentativa DESC 
`

interface WebhookCall {
  id: string
  request_id: string
  action: string
  body: string
  url: string
  http_metodo: string
  proxima_tentativa: string
  created_at: string
  fk_app: string
  app_nome: string
}

export async function getWebhookCalls(): Promise<WebhookCall[]> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(query)
    return rows.map((row) => {
      return {
        id: row.id,
        request_id: row.request_id,
        action: row.action,
        body: row.body,
        url: row.url,
        http_metodo: row.http_metodo,
        proxima_tentativa: row.proxima_tentativa,
        created_at: row.created_at,
        fk_app: row.fk_app,
        app_nome: row.app_nome,
      }
    })
  } catch (error) {
    console.error('Erro ao obter chamadas de webhook:', error)
    throw error
  }
}
