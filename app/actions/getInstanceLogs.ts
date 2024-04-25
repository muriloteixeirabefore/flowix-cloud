'use server'

import { vastAiApi } from '@/lib/axios';

export async function getInstanceLogs(instance_id: string) {
    const today = new Date();
    // format date to mm-dd-yy
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear().toString().substring(2);

    // format month with leading zero
    const monthStr = month < 10 ? '0' + month : month.toString();
    // format day with leading zero
    const dayStr = day < 10 ? '0' + day : day.toString();
    const date = monthStr + '_' + dayStr + '_' + year;

    console.log("Getting logs for instance: " + instance_id + " on date: " + date);
    
    const command = 'cat /Flowix/logs/process_monitor'+ date +'.log'

    const response = await vastAiApi.put('/instances/command/' + instance_id +'/', {
        command
    })
    return response.data
}