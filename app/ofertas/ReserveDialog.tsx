import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog"
import { CircleDollarSign } from "lucide-react"
import { get_machine_label } from "../utils"

export function ReserveDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded-md space-x-1">
          <CircleDollarSign className="w-4 h-4" />
          <span>Reservar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Reservar Maquina</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
                {["latest", "v1", "v2"].map((image) => (
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
              defaultValue=""
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comand" className="text-right">
              Comando
            </Label>
            <Textarea 
            placeholder="Comando para iniciar o container"
            className="col-span-3"
            />
          </div>
        </div>
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
  )
}
