import { z } from 'zod'

export const envSchema = z.object({
  FLOWIX_API_URL: z.string(),
  DB_URL: z.string(),
  VASTAI_URL: z.string(),
  VASTAI_TOKEN: z.string(),
  DOCKER_USERNAME: z.string(),
  DOCKER_PASSWORD: z.string(),
})

export const env = envSchema.parse(process.env)
