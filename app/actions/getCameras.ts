'use server'

import { pool } from '@/lib/mysql'
import { osClient } from '@/lib/opensearch'
import { RowDataPacket } from 'mysql2'

interface Camera {
  camera_id?: number
  camera_nome?: string
  camera_status?: string
  camera_url?: string
  empresa_nome?: string
  unidade_nome?: string
  maquina_label?: string
}

const query = `
SELECT DISTINCT
c.id camera_id, c.nome camera_nome, 
c.status camera_status, c.url camera_url,
e.nome empresa_nome, u.nome unidade_nome,
m.label maquina_label
FROM camera c 
JOIN area a ON a.fk_area_camera = c.id
JOIN empresa e ON e.id = c.fk_camera_empresa 
JOIN unidade u ON u.id = c.fk_camera_unidade 
JOIN maquina m on m.id = c.fk_camera_maquina
WHERE e.demonstracao IS FALSE
AND a.deleted_at IS NULL
AND c.deleted_at IS NULL
AND e.deleted_at IS NULL
AND u.deleted_at IS NULL
`

export async function getDbData(): Promise<Camera[]> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(query)
    return rows.map((row) => {
      return {
        camera_id: row.camera_id,
        camera_nome: row.camera_nome,
        camera_status: row.camera_status,
        camera_url: row.camera_url,
        empresa_nome: row.empresa_nome,
        unidade_nome: row.unidade_nome,
        maquina_label: row.maquina_label
      }
    })
  } catch (error) {
    console.error('Erro ao obter Câmeras:', error)
    throw error
  }
}

export async function getCameras() {
  const cameras = await getDbData()
  const camerasIds = cameras.map((camera) => camera.camera_id)
  // const hits = await getLastHits(camerasIds as number[])

  return cameras.map((camera) => {
    //const hit = hits.find((hit) => hit.camera_id === area.camera_id)
    return {
      camera_id: camera.camera_id,
      camera_nome: camera.camera_nome,
      camera_status: camera.camera_status,
      camera_url: camera.camera_url,
      empresa_nome: camera.empresa_nome,
      unidade_nome: camera.unidade_nome,
      maquina_label: camera.maquina_label,
    }
  })
}
