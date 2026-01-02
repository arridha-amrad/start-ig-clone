import { FooterAuth } from "@/components/FooterAuth";
import { InstagramText } from "@/components/svg/Instagram";
import FormLogin from "@/features/auth/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full flex-1 p-10 flex items-center justify-center md:gap-8 max-w-sm md:max-w-4xl mx-auto">
        <div className="hidden md:block flex-2">
          <img
            className="w-auto h-auto"
            src="/landing-2x.png"
            alt="Cover Image"
            width={500}
            height={500}
          />
        </div>
        <div className="flex-1">
          <div className="my-2 flex justify-center">
            <InstagramText isBig />
          </div>
          <FormLogin />
        </div>
      </div>
      <FooterAuth />
    </main>
  );
}
