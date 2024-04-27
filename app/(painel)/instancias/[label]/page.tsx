export default function DetailInstanciaPage({
  params,
}: {
  params: { label: string }
}) {
  return <div>My Post: {params.label}</div>
}
