// Server Action
'use server'

import { vastAiApi } from '@/lib/axios';


function calculate_total_of_cameras(offer: any) {
        // a cada 8 CPU Efetivas, processa 40 cameras
        const qtd_by_cpu = offer.cpu_cores_effective / 8 * 40 / 2

        // a cada 16 Gb Ram, processa 50 câmeras
        const qtd_by_gpu = offer.gpu_total_ram / 16 * 50
    
        return Math.min(qtd_by_cpu, qtd_by_gpu) * 0.8
    }


export async function getVastAiOffers() {

    const payload = {
      "verified": {"eq": true},
      "gpu_frac": {"eq": 1},
      "inet_down": {"gt": 250},
      "order": [],
      "geolocation": {"in": ["US", "CA", "BR", "AR", "CL", "SE"]},
      "reliability2": {"gt": 0.99},
      "gpu_total_ram": {"gt": 16_000},
      "rentable": {"eq": true},
      "rented": {"eq": false},
  }
    
    const response = await vastAiApi.post('/bundles/', 
            {...payload}
            )

    const offers = response.data

    return offers.offers.map((offer: any) => {    

        const cost_dph = offer.dph_total
        const total_of_cameras = Math.round(calculate_total_of_cameras(offer))
        const cost_inet_down_per_camera_hour = 1 / 16 * offer.inet_down_cost  // 1 Gb por 16h
        const cost_per_camera_hour = cost_dph / total_of_cameras + cost_inet_down_per_camera_hour
        const cost_per_hour = cost_per_camera_hour * total_of_cameras

        return {
            custo_por_camera_hora: cost_per_camera_hour,
            custo_por_camera_por_16h: cost_per_camera_hour * 16,
            custo_hora: cost_per_hour,
            custo_dia: cost_per_hour * 16,
            custo_mes: cost_per_hour * 16 * 30,
            fwx_cameras: total_of_cameras,
            qtd_gpus: offer.gpu_ids.length,
            ...offer
        }
    })
  }