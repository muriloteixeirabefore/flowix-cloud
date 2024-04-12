"use server"

import { api } from '@/lib/axios'

export interface getFusosResponse {
    fusos: {
        _id: string
        fuso: string
        nome: string
    }[]
}

export async function getFusos(): Promise<getFusosResponse> {
    const reponse = await api.get<getFusosResponse>('/utils/geo/fusos')
    return reponse.data
}
