import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$username/tagged')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$username/tagged"!</div>
}
