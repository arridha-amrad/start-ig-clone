import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/notification')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/notification"!</div>
}
