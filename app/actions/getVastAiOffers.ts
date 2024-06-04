// Server Action
'use server'

import { vastAiApi } from '@/lib/axios'

const DAY_HOURS = 16

function calculateMaxCameras(offer: any) {
  // a cada 8 CPU Efetivas, processa 40 cameras
  const qtdByCpu = ((offer.cpu_cores_effective / 8) * 40) / 2

  // a cada 16 Gb Ram, processa 50 câmeras
  const qtdByGpu = (offer.gpu_total_ram / 16) * 50

  // retorna o menor valor e desconta 20%
  return Math.min(qtdByCpu, qtdByGpu) * 0.8
}

export async function getVastAiOffers() {
  const payload = {
    verified: { eq: true },
    gpu_frac: { eq: 1 },
    gpu_total_ram: { gt: 10_000 },
    cpu_ram: { gt: 30_000 },
    inet_down: { gt: 150 },
    geolocation: { in: ['US', 'CA', 'BR', 'AR', 'CL', 'SE'] },
    reliability2: { gt: 0.97 },
    rentable: { eq: true },
    rented: { eq: false },
  }

  const response = await vastAiApi.post('/bundles/', payload)
  const offers = response.data.offers

  return offers.map((offer: any) => {
    const maxCameras = Math.round(calculateMaxCameras(offer))
    const costInetDownPerCameraHour = (1 / 16) * offer.inet_down_cost // 1 Gb por 16h
    const costPerCameraHour =
      offer.dph_total / maxCameras + costInetDownPerCameraHour
    const costPerHour = costPerCameraHour * maxCameras

    return {
      id: offer.id,
      gpu_name: offer.gpu_name,
      gpu_ram: Math.round(offer.gpu_ram / 1024),
      num_gpus: offer.num_gpus,
      cpu_cores_effective: Math.round(offer.cpu_cores_effective),
      cpu_name: offer.cpu_name,
      cpu_ram: Math.round(offer.cpu_ram / 1024),
      max_cameras: maxCameras,
      cost_per_hour: costPerHour,
      cost_per_day: costPerHour * DAY_HOURS,
      cost_per_month: costPerHour * DAY_HOURS * 30,
      cost_per_camera_day: costPerCameraHour * DAY_HOURS,
      cost_per_camera_month: costPerCameraHour * DAY_HOURS * 30,
      inet_down: offer.inet_down,
      reliability: offer.reliability2,
      public_ipaddr: offer.public_ipaddr,
      geolocation: offer.geolocation,
    }
  })
}
