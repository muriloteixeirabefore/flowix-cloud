import { Client } from '@opensearch-project/opensearch'

export const osClient = new Client({ node: 'http://52.203.223.240:9011' })
