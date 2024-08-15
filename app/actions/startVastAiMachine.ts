'use server'

import { flowixApi, vastAiApi } from '@/lib/axios'
import { pool } from '@/lib/mysql'
import { RowDataPacket } from 'mysql2'
import { env } from 'process'

interface StartData {
  machine_name: string
  docker_image: string
  on_start_script: string
  ask_contract_id: string
  public_ipaddr: string
}

export async function startVastAiMachine(data: StartData) {
  const apiResponseCreate = await flowixApi.post('/thanos/maquinas', {
    label: data.machine_name,
    ipv4: data.public_ipaddr,
    provider: 'vast.ai',
  })
  // console.log('api_response_create', apiResponseCreate.data)
  // console.log('token', apiResponseCreate.data.access_token)

  const vastResponse = await vastAiApi.put(`/asks/${data.ask_contract_id}/`, {
    label: data.machine_name,
    image: data.docker_image,
    onstart: data.on_start_script,
    image_login: `-u ${env.DOCKER_USERNAME} -p ${env.DOCKER_PASSWORD} docker.io`,
    env: {
      TZ: 'UTC',
      API_FLOWIX_KEY: apiResponseCreate.data.access_token,
      FLOWIX_MAQUINA_ID: apiResponseCreate.data._id,
    },
    client_id: 'me',
    disk: 20,
    extra: null,
    runtype: 'ssh',
    python_utf8: true,
    lang_utf8: true,
    use_jupyter_lab: false,
    jupyter_dir: null,
    create_from: null,
    force: false,
  })
  // console.log('vastai_response', vastResponse.data)

  if (!vastResponse.data.success || !vastResponse.data.new_contract) {
    await flowixApi.delete(`/thanos/maquinas/${apiResponseCreate.data._id}`)
    throw new Error('Vast.ai did not return a new contract')
  }

  const apiResponseUpdate = await flowixApi.put(
    `/thanos/maquinas/${apiResponseCreate.data._id}`,
    {
      active: true,
      outros_campos: {
        contract_id: vastResponse.data.new_contract,
      },
    },
  )
  // console.log('api_response_update', apiResponseUpdate.data)

  return apiResponseUpdate.data
}

export async function getCamerasMaquina(maquinaId: string) {
  const query = `
  SELECT c.id, c.nome, c.status, c.url
  FROM camera c
  JOIN maquina m on m.id = c.fk_camera_maquina 
  WHERE c.fk_camera_maquina = ${maquinaId}
  AND m.active is TRUE
  AND c.deleted_at is NULL
  AND m.deleted_at is NULL 
  `
  const [rows] = await pool.query<RowDataPacket[]>(query)
  return rows.map((row) => ({
    id: row.id,
    nome: row.nome,
    status: row.status,
    url: row.url,
  }))
}
