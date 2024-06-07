'use server'

import { env } from '@/env'
import { flowixApi } from '@/lib/axios'

interface StartData {
  machine_name: string
  docker_image: string
  on_start_script: string
  ask_contract_id: string
  public_ipaddr: string
}

export async function startVastAiMachine(data: StartData) {
  createMachineInstance({
    label: data.machine_name,
    ipv4: data.public_ipaddr,
  })

  const payload = {
    label: data.machine_name,
    image: data.docker_image,
    onstart: data.on_start_script,
    image_login: `-u ${env.DOCKER_USERNAME} -p ${env.DOCKER_PASSWORD} docker.io`,

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
  console.log('enviado pro vastai')

  // const response = await vastAiApi.put(`/asks/${data.ask_contract_id}/`, payload)
  // return response.data
}

async function createMachineInstance({
  label,
  ipv4,
}: {
  label: string
  ipv4: string
}) {
  const payload = {
    label,
    ipv4,
    provider: 'vast.ai',
  }
  const response = flowixApi.post('/thanos/maquinas', payload)
  console.log(response)
}
