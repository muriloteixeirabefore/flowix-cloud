'use server'

import { pool } from '@/lib/mysql'
import { osClient } from '@/lib/opensearch'
import { RowDataPacket } from 'mysql2'

interface Area {
  area_id?: number
  area_nome?: string
  camera_id?: number
  camera_nome?: string
  ip_maquina?: string
  camera_status?: string
  camera_created_at?: string
  empresa_nome?: string
  unidade_nome?: string
}

const query = `
SELECT
a.id area_id, a.nome area_nome, 
c.id camera_id, c.nome camera_nome, c.vision_ip ip_maquina, 
c.status camera_status, c.created_at camera_created_at, 
e.nome empresa_nome, u.nome unidade_nome
FROM camera c 
JOIN area a ON a.fk_area_camera = c.id
JOIN empresa e ON e.id = c.fk_camera_empresa 
JOIN unidade u ON u.id = c.fk_camera_unidade 
WHERE e.demonstracao IS FALSE
AND a.deleted_at IS NULL
AND c.deleted_at IS NULL
AND e.deleted_at IS NULL
AND u.deleted_at IS NULL
`

export async function getDbData(): Promise<Area[]> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(query)
    return rows.map((row) => {
      return {
        area_id: row.area_id,
        area_nome: row.area_nome,
        camera_id: row.camera_id,
        camera_nome: row.camera_nome,
        ip_maquina: row.ip_maquina,
        camera_status: row.camera_status,
        camera_created_at: row.camera_created_at,
        empresa_nome: row.empresa_nome,
        unidade_nome: row.unidade_nome,
      }
    })
  } catch (error) {
    console.error('Erro ao obter áreas:', error)
    throw error
  }
}

export async function getLastHits(
  areasIds: number[],
): Promise<{ area_id: number; timestamp_bsb: string }[]> {
  try {
    const { body } = await osClient.search({
      index: 'bioembeddings',
      body: {
        size: areasIds.length,
        query: {
          bool: {
            filter: {
              terms: {
                area_id: areasIds,
              },
            },
          },
        },
        aggs: {
          areas: {
            terms: {
              field: 'area_id',
              size: areasIds.length,
              order: { latest_timestamp: 'desc' },
            },
            aggs: {
              latest_timestamp: { max: { field: 'timestamp' } },
              latest_record: {
                top_hits: {
                  size: 1,
                  sort: [{ timestamp: { order: 'desc' } }],
                  _source: {
                    includes: ['area_id', 'timestamp_bsb'],
                  },
                },
              },
            },
          },
        },
      },
    })

    const buckets = body.aggregations.areas.buckets

    return buckets.map((bucket: any) => {
      const latestRecord = bucket.latest_record.hits.hits[0]
      return {
        area_id: Number(bucket.key),
        timestamp_bsb: latestRecord._source.timestamp_bsb,
      }
    })
  } catch (error) {
    console.error('Erro ao obter hits:', error)
    throw error
  }
}

export async function getAreas() {
  const areas = await getDbData()
  const areasIds = areas.map((area) => area.area_id)
  const hits = await getLastHits(areasIds as number[])

  return areas.map((area) => {
    const hit = hits.find((hit) => hit.area_id === area.area_id)
    return {
      area_id: area.area_id,
      area_nome: area.area_nome,
      camera_id: area.camera_id,
      unidade_nome: area.unidade_nome,
      empresa_nome: area.empresa_nome,
      timestamp_bsb: hit?.timestamp_bsb,
    }
  })
}
