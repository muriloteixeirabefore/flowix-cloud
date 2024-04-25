"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { CircleDollarSign } from "lucide-react";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from 'zod';
import { get_machine_label } from "../utils";

interface ReserveDialogProps {
  max_cameras: number;
  docker_tags?: string[];
}

const reserveFormSchema = z.object({
  machine_name: z.string(),
  docker_image: z.string(),
  qtd_cameras: z.number(),
  command: z.string(),
});

export function ReserveDialog({ max_cameras, docker_tags }: ReserveDialogProps) {
  const form = useForm({
    resolver: zodResolver(reserveFormSchema),
    defaultValues: {
      machine_name: get_machine_label(),
      docker_image: docker_tags?.[0] ?? '',
      qtd_cameras: max_cameras,
      command: `screen -dmS SESSION; screen -S SESSION -X stuff 'python3 /Flowix/FlowixStart.py --cameras ${max_cameras} &\\n'`
    }
  });

  function onSubmitHandler(values: z.infer<typeof reserveFormSchema>) {
    console.log(values);
  }


  const [cameras, setCameras] = useState(max_cameras);
  const [command, setCommand] = useState(
    `screen -dmS SESSION; screen -S SESSION -X stuff 'python3 /Flowix/FlowixStart.py --cameras ${max_cameras} &\\n'`
  );

  const handleCameraChange = (event: any) => {
    const newCameras = event.target.value;
    setCameras(newCameras);
    setCommand(
      `screen -dmS SESSION; screen -S SESSION -X stuff 'python3 /Flowix/FlowixStart.py --cameras ${newCameras} &\\n'`
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded-md space-x-1">
          <CircleDollarSign className="w-4 h-4" />
          <span>Reservar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Reservar Máquina</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <FormField
              control={form.control}
              name="machine_name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="machine-name" className="text-right">
                      Nome da máquina
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="machine-name"
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            {/* <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="machine-name" className="text-right">
                  Nome da máquina
                </Label>
                <Input
                  id="machine-name"
                  defaultValue={get_machine_label()}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="docker-image" className="text-right">
                  Imagem Docker
                </Label>
                <Select
                  value=""
                  onValueChange={(value: any) => {
                    //console.log(value)
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma imagem" />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {docker_tags?.map((image) => (
                      <SelectItem key={image} value={`${image}`}>
                        {image}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="qtd-cameras" className="text-right">
                  Quantidade de câmeras
                </Label>
                <Input
                  id="qtd-cameras"
                  value={cameras}
                  type="number"
                  onChange={handleCameraChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="command" className="text-right">
                  Comando
                </Label>
                <Textarea
                  placeholder="Comando para iniciar o container"
                  className="col-span-3"
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                />
              </div>
            </div> */}
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-red-500 hover:bg-red-700 text-white shadow-md rounded-md space-x-1">
              Cancelar
            </Button>
          </DialogClose>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded-md space-x-1">
            <CircleDollarSign className="w-4 h-4" />
            <span>Reservar</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
