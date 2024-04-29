export default function InstanceDetailPage({
  params,
}: {
  params: { instance_id: string }
}) {
  return <div>My Post: {params.instance_id}</div>
}
