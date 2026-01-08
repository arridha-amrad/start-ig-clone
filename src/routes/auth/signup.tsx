import { FooterAuth } from "@/components/FooterAuth";
import FormSignup from "@/features/auth/components/FormSignup";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs mx-auto flex-1 py-8">
        <FormSignup />
      </div>
      <FooterAuth />
    </main>
  );
}
