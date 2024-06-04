'use client'

import { getWebhookCalls } from '@/app/actions/getWebhookCalls'
import { H4 } from '@/components/ui/h4'
import { useQuery } from '@tanstack/react-query'
import { WebhookTable } from './Webhook'

export default function WebhookCallsPage() {
  const { data } = useQuery({
    queryKey: ['responses'],
    queryFn: () => getWebhookCalls(),
    initialData: [],
  })

  return (
    <>
      <H4>Webhooks</H4>
      <WebhookTable data={data} />
    </>
  )
}
