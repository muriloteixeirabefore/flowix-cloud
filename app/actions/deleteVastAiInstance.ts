'use server'
import { vastAiApi } from '@/lib/axios'

export async function deleteVastAiInstance(instanceId: string) {
  // delete instance
  console.log('deleteVastAiInstance', instanceId)

  const response = await vastAiApi.delete(`/instances/${instanceId}/`)
  if (response.status == 200) {
    // inativa câmeras no mysql
  }
  return response.status == 200
}
