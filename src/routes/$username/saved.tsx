import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$username/saved')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$username/saved"!</div>
}
