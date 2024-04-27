// Server Action
'use server'

import { vastAiApi } from '@/lib/axios'

const DAY_HOURS = 16

function calculate_max_cameras(offer: any) {
  // a cada 8 CPU Efetivas, processa 40 cameras
  const qtd_by_cpu = ((offer.cpu_cores_effective / 8) * 40) / 2

  // a cada 16 Gb Ram, processa 50 câmeras
  const qtd_by_gpu = (offer.gpu_total_ram / 16) * 50

  // retorna o menor valor e desconta 20%
  return Math.min(qtd_by_cpu, qtd_by_gpu) * 0.8
}

export async function getVastAiOffers() {
  const payload = {
    verified: { eq: true },
    gpu_frac: { eq: 1 },
    inet_down: { gt: 250 },
    order: [],
    geolocation: { in: ['US', 'CA', 'BR', 'AR', 'CL', 'SE'] },
    reliability2: { gt: 0.99 },
    gpu_total_ram: { gt: 16_000 },
    rentable: { eq: true },
    rented: { eq: false },
  }

  const response = await vastAiApi.post('/bundles/', payload)
  const offers = response.data.offers

  return offers.map((offer: any) => {
    const max_cameras = Math.round(calculate_max_cameras(offer))
    const cost_inet_down_per_camera_hour = (1 / 16) * offer.inet_down_cost // 1 Gb por 16h
    const cost_per_camera_hour =
      offer.dph_total / max_cameras + cost_inet_down_per_camera_hour
    const cost_per_hour = cost_per_camera_hour * max_cameras

    return {
      id: offer.id,
      gpu_name: offer.gpu_name,
      gpu_ram: Math.round(offer.gpu_ram / 1024),
      qtd_gpus: offer.gpu_ids.length,
      cpu_cores_effective: offer.cpu_cores_effective,
      cpu_name: offer.cpu_name,
      max_cameras,
      cost_per_hour,
      cost_per_day: cost_per_hour * DAY_HOURS,
      cost_per_month: cost_per_hour * DAY_HOURS * 30,
      cost_per_camera_day: cost_per_camera_hour * DAY_HOURS,
      cost_per_camera_month: cost_per_camera_hour * DAY_HOURS * 30,
      inet_down: offer.inet_down,
      reliability: offer.reliability2,
      public_ipaddr: offer.public_ipaddr,
      geolocation: offer.geolocation,
    }
  })
}
