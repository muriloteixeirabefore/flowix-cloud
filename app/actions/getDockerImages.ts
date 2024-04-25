'use server'

import { dockerApi } from '@/lib/axios';


export async function getRepositoryTags() {
    const response = await dockerApi.get('/namespaces/flowix/repositories/ml/tags')
    return response.data
}