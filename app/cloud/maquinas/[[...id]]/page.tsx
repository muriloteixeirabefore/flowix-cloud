'use client'

import { getInstanceDetail } from '@/app/actions/getInstances'
import { getCamerasMaquina } from '@/app/actions/startVastAiMachine'
import { H4 } from '@/components/ui/h4'
import { Ul } from '@/components/ui/ul'
import { useQuery } from '@tanstack/react-query'

type InstanceDetailPageProps = {
  params: {
    id: string[]
  }
}

export default function InstanceDetailPage({
  params,
}: InstanceDetailPageProps) {
  const { data: instance } = useQuery({
    queryKey: ['maquinas', params.id[1]],
    queryFn: () => getInstanceDetail(params.id[1]),
    refetchInterval: false,
  })
  const { data: cameras, isLoading } = useQuery({
    queryKey: ['cameras', params.id[0]],
    queryFn: () => getCamerasMaquina(params.id[0]),
    refetchInterval: false,
  })

  console.log('cameras', cameras)

  return (
    <div>
      <div>
        <H4>Instance Details</H4>
        {isLoading ? (
          <p>Carregando cameras...</p>
        ) : cameras?.length ? (
          <Ul>
            {cameras.map((camera: any) => (
              <li key={camera.id}>
                <p>{camera.id}</p>
                <p>{camera.nome}</p>
                <p>{camera.status}</p>
                <p>{camera.url}</p>
              </li>
            ))}
          </Ul>
        ) : (
          <p>Nenhuma camera processando</p>
        )}
      </div>
      <pre>{JSON.stringify(instance, null, 2)}</pre>
    </div>
  )
}

// treshold 97% da oferta
// duration da oferta ser maior que 24h
