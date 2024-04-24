"use client"

import { getVastAiOffers } from "@/app/actions/getVastAiOffers";


import { H4 } from "@/components/ui/h4";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useQuery } from '@tanstack/react-query';


export default function OfertasPage() {
    const { data } = useQuery({
        queryKey: ['ofertas'],
        queryFn: () => getVastAiOffers(),
    })
   
    return <>
    <H4>Ofertas</H4>




    <Table>
    <TableCaption>{data?.length} ofertas</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="text-right">GPU</TableHead>
        <TableHead>CPU</TableHead>
        <TableHead>MaxCams</TableHead>
        <TableHead>Custo Hora</TableHead>
        <TableHead>Custo Câmera/Dia</TableHead>
        <TableHead>Custo Dia</TableHead>
        <TableHead>Custo câmera/mês</TableHead>
        <TableHead>Custo Mês</TableHead>
        <TableHead>Download</TableHead>
        <TableHead>Reliability</TableHead>
        <TableHead>IP</TableHead>
        <TableHead>Localização</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
        data?.map((oferta) => (
          <TableRow key={oferta.id}>
            <TableCell>{oferta.qtd_gpus} x {oferta.gpu_name} {Math.round(oferta.gpu_ram / 1024)} GB</TableCell>
            <TableCell>{oferta.cpu_cores_effective} x {oferta.cpu_name}</TableCell>
            <TableCell>{oferta.fwx_cameras}</TableCell>
            <TableCell>{oferta.custo_hora}</TableCell>
            <TableCell>{oferta.custo_por_camera_por_16h}</TableCell>
            <TableCell>{oferta.custo_dia}</TableCell>
            <TableCell>{oferta.custo_mes / oferta.fwx_cameras}</TableCell>
            <TableCell>{oferta.custo_mes}</TableCell>
            <TableCell>{oferta.inet_down} Mbps</TableCell>
            <TableCell>{oferta.reliability2}</TableCell>
            <TableCell>{oferta.public_ipaddr}</TableCell>
            <TableCell>{oferta.geolocation}</TableCell>
            <TableCell>
              <button>Editar</button>
              <button>Deletar</button>
            </TableCell>
          </TableRow>
        ))
      }
    </TableBody>
  </Table>


    </>
}
