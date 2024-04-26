'use server'

import { vastAiApi } from '@/lib/axios';

export async function getInstances() {
    const response = await vastAiApi.get('/instances/')
    return response.data.instances.map((instance: any) => ({
        id: instance.id,
        label: instance.label,
        actual_status: instance.actual_status,
        cur_state: instance.cur_state,
        gpu: instance.gpu_util.toFixed(2) + '%',
        cpu: instance.cpu_util.toFixed(2) + '%',
        ram: instance.mem_usage.toFixed(2) + '/' + instance.mem_limit.toFixed(2) + ' GB',
        specs: instance.cpu_cores_effective + ' vCPUs ' + instance.cpu_name + ' ' + instance.mobo_name + ' ' + instance.num_gpus + ' ' + instance.gpu_name + ' ' + Math.round(instance.gpu_ram/1024) + 'GB',
        ip: instance.public_ipaddr,
        location: instance.geolocation,
        status_msg: instance.status_msg
    }))
}