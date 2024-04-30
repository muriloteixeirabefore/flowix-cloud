import { Client } from '@opensearch-project/opensearch'
import { env } from '@/env'

export const osClient = new Client({ node: env.OPENSEARCH_URL })
