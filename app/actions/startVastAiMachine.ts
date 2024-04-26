import { z } from "zod";
import { vastAiApi } from "@/lib/axios";
import { toast } from "sonner";
import { redirect } from 'next/navigation'


const startVastAiMachineeSchema = z.object({
  docker_image: z.string(),
  on_start_script: z.string(),
  ask_contract_id: z.string(),
  name: z.string(),
});

export async function startVastAiMachine(data: z.infer<typeof startVastAiMachineeSchema>) {
    await vastAiApi.post('/instances', data).then(response => {
      if (response.status === 200) {
        toast.success("Máquina reservada com sucesso");
        // Redirect to home page
        redirect('/')
      } else {
        toast.error("Erro ao reservar máquina");
      }
    }
    )
  }
