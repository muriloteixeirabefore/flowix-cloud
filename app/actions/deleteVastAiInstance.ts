'use server'
import { vastAiApi } from '@/lib/axios'

export async function deleteVastAiInstance(instanceId: string) {
  const response = await vastAiApi.delete(`/instances/${instanceId}/`)
  if (response.status === 200) {
    // TODO: inativar câmeras no mysql
    // TODO: deletar máquina no flowix
  }
  return response.status === 200
}
