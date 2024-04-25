"use client";

import { getInstanceLogs } from "@/app/actions/getInstanceLogs";
import { getInstances } from "@/app/actions/getInstances";
import { Button } from "@/components/ui/button";
import { H4 } from "@/components/ui/h4";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CopyIcon, FileTextIcon, OpenInNewWindowIcon, TrashIcon } from "@radix-ui/react-icons";
  
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
  


export default function InstancePage() {
    // useQuery to getInstances
    const { data: instances } = useQuery({
        queryKey: "instances", // "instances" is a unique identifier for this query
        queryFn: () => getInstances(),
        refetchInterval: 1000 * 5, // refetch every 5 seconds
    })

    return (
        <div className="w-auto mx-5 my-5 space-y-5">
          <H4>Instâncias</H4>
        <Table>
        <TableCaption>Lista de instancias</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>State</TableHead>
            <TableHead>GPU</TableHead>
            <TableHead>CPU</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead>Specs</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status Message</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            instances && instances.map((instance: any) => (
              <TableRow key={instance.id}>
                <TableCell>
                <Link href={`/instances/${instance.id}`}>
                <Button variant="ghost" className="flex flex-row items-center">
                    {instance.label} <OpenInNewWindowIcon className="ml-2 h-4 w-4" />
                </Button>
                </Link>
                </TableCell>
                <TableCell>{instance.actual_status}</TableCell>
                <TableCell>{instance.cur_state}</TableCell>
                <TableCell>{instance.gpu}</TableCell>
                <TableCell>{instance.cpu}</TableCell>
                <TableCell>{instance.ram}</TableCell>
                <TableCell>{instance.specs}</TableCell>
                <TableCell>
                <Button variant="ghost" onClick={() => {
                    navigator.clipboard.writeText(instance.ip);
                }}>{instance.ip} <CopyIcon className="ml-2 h-4 w-4" /></Button>
                </TableCell>
                <TableCell>{instance.location}</TableCell>
                <TableCell>{instance.status_msg}</TableCell>
                <TableCell className="flex flex-row space-x-2">
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" onClick={() => {
                        const response = getInstanceLogs(instance.id).then(
                            ({result_url, success}) => {
                                if (success) {
                                    const a = document.createElement('a');
                                    a.href = result_url;
                                    a.download = 'logs.txt';
                                    a.target = '_blank';
                                    a.click();                                    
                                } else {
                                    alert('Failed to get logs')
                                }
                            }
                        )                     
                    }}><FileTextIcon /></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Ver logs</p>
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
                    <Button size="icon" onClick={() => console.log('clicked')}><TrashIcon /></Button>
                </TableCell>
              </TableRow>
            ))
            }
        </TableBody>
      </Table>
      </div>
    );
};