'use client'

import { getVastAiOffers } from '@/app/actions/getVastAiOffers'
import { DataTable } from '@/components/data-table/data-table'
import { H4 } from '@/components/ui/h4'
import { useQuery } from '@tanstack/react-query'
import { getDockerRepositoryTags } from '../../actions/docker'
import { columns, OfferData } from './columns'

export default function OfertasPage() {
  const { data: result } = useQuery({
    queryKey: ['ofertas'],
    queryFn: () => getVastAiOffers(),
    initialData: [],
  })

  const { data: docker_tags } = useQuery({
    queryKey: ['docker_tags'],
    queryFn: () => getDockerRepositoryTags(),
    initialData: [],
  })

  const offer_data: OfferData[] = result?.map((offer: any) => {
    return {
      gpu_data:
        offer.qtd_gpus + 'x ' + offer.gpu_name + ' ' + offer.gpu_ram + 'GB',
      cpu_data: offer.cpu_cores_effective + ' x ' + offer.cpu_name,
      max_cameras: offer.max_cameras,
      custo_hora: '$' + offer.cost_per_hour.toFixed(2),
      custo_por_camera_dia: '$' + offer.cost_per_camera_day.toFixed(2),
      custo_dia: '$' + offer.cost_per_day.toFixed(2),
      custo_mes: '$' + offer.cost_per_month.toFixed(2),
      custo_camera_mes: '$' + offer.cost_per_camera_month.toFixed(2),
      inet_down: offer.inet_down.toFixed(0) + ' Mbps',
      reliability: (offer.reliability * 100).toFixed(2) + '%',
      public_ipaddr: offer.public_ipaddr,
      geolocation: offer.geolocation,
      docker_tags: docker_tags.map((tag: string) => 'flowix/ml:' + tag),
      offer_id: offer.id,
    }
  })

  return (
    <div className="mx-5 my-5 w-auto space-y-5">
      <H4>Ofertas</H4>
      <DataTable<OfferData, keyof OfferData>
        columns={columns}
        data={offer_data}
      />
    </div>
  )
}
