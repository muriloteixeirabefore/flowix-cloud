'use server'

import { env } from '@/env'
import { dockerApi } from '@/lib/axios'

export async function getDockerToken() {
  const response = await dockerApi.post('/users/login', {
    username: env.DOCKER_USERNAME,
    password: env.DOCKER_PASSWORD,
  })
  return response.data.token
}

export async function getDockerRepositoryTags() {
  const response = await dockerApi.get(
    '/namespaces/flowix/repositories/ml/tags',
  )
  return response.data.results.map((tag: any) => tag.name)
}
