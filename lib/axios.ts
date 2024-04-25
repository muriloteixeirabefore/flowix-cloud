import { env } from '@/env'
import axios from 'axios'


export const flowixApi = axios.create({
  baseURL: env.FLOWIX_API_URL,
  withCredentials: true
})

export const vastAiApi = axios.create({
  baseURL: env.VASTAI_URL,
  headers: {
    Authorization: `Bearer ${env.VASTAI_TOKEN}`,
    Accept: 'application/json',
  }
})

vastAiApi.interceptors.response.use(x => {
  // use this to debug requests
  //console.log('VastAiApi response:', x)
  return x
})

vastAiApi.interceptors.request.use(x => {
  // use this to debug requests
  //console.log('VastAiApi request:', x)
  return x
})

export const dockerApi = axios.create({
  baseURL: 'https://hub.docker.com/v2',
  headers: {
    Authorization: `Bearer blablabla`,
    Accept: 'application/json',
  }
})

dockerApi.interceptors.response.use(x => {
  return x
}, error => {
  const { response, config } = error
  if (response.status === 401) {
    console.log('Docker API Unauthorized')
  }
  return Promise.reject(error)
}
)

