'use server'

import { env } from '@/env'
import { vastAiApi } from '@/lib/axios'
import { z } from 'zod'

const PAYLOAD_BASE = {
  label: '',
  image: '',
  onstart: '',
  image_login: '',
  client_id: 'me',
  env: { TZ: 'UTC', API_FLOWIX_KEY: btoa('tokenteste') },
  disk: 20,
  extra: null,
  runtype: 'ssh',
  python_utf8: true,
  lang_utf8: true,
  use_jupyter_lab: false,
  jupyter_dir: null,
  create_from: null,
  force: false,
}

const startVastAiMachineSchema = z.object({
  machine_name: z.string(),
  docker_image: z.string(),
  on_start_script: z.string(),
  ask_contract_id: z.string(),
})

export async function startVastAiMachine(
  data: z.infer<typeof startVastAiMachineSchema>,
) {
  const response = await vastAiApi.put(`/asks/${data.ask_contract_id}/`, {
    ...PAYLOAD_BASE,
    label: data.machine_name,
    image: data.docker_image,
    onstart: data.on_start_script,
    image_login: `-u ${env.DOCKER_USERNAME} -p ${env.DOCKER_PASSWORD} docker.io`,
  })
  return response.data
}
