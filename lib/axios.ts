import { env } from '@/env'
import axios from 'axios'


export const api = axios.create({
  baseURL: env.API_URL,
  withCredentials: true
})

export const vastAiApi = axios.create({
  baseURL: env.VASTAI_URL,
  headers: {
    Authorization: `Bearer ${env.VASTAI_TOKEN}`,
    Accept: 'application/json',
  }
})
