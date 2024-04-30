import { z } from 'zod'

export const envSchema = z.object({
  DB_DATABASE: z.string(),
  DB_HOST: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DOCKER_PASSWORD: z.string(),
  DOCKER_USERNAME: z.string(),
  FLOWIX_API_URL: z.string().url(),
  OPENSEARCH_URL: z.string().url(),
  VASTAI_TOKEN: z.string(),
  VASTAI_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
