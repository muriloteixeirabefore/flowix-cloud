import { getDockerToken } from '@/app/actions/docker'
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
})

dockerApi.interceptors.response.use(x => {
  return x
}, async error => {
  const { response, config } = error
  if ([401, 404].includes(response.status)) {
    const token = await getDockerToken()
    config.headers['Authorization'] = `Bearer ${token}`
    return await axios.request(config) 
  } 
  return Promise.reject(error)
}
)

