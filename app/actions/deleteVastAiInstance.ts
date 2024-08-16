'use server'
import { flowixApi, vastAiApi } from '@/lib/axios'

export async function deleteVastAiInstance(
  instanceId: string,
  instanceLabel: string,
) {
  const response = await vastAiApi.delete(`/instances/${instanceId}/`)
  if (response.status === 200) {
    // TODO: inativar câmeras no mysql
    // TODO: deletar máquina no flowix
    await flowixApi.delete(`/thanos/maquinas/${instanceLabel}`)
  }
  return response.status === 200
}
