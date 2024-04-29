interface InstanceDetailPageProps {
  params: { instance_id: string }
}

export default function InstanceDetailPage({
  params,
}: InstanceDetailPageProps) {
  return <div>Instancia: {params.instance_id}</div>
}
