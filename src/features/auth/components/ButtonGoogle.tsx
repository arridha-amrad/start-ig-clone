import SvgGoogle from "@/components/svg/Google";
import { authClient } from "@/lib/auth-client";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";

export default function GoogleAuthButton() {
  const handleGoogleOAuth = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <Button
      onClick={handleGoogleOAuth}
      className="border-foreground/20 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-foreground"
    >
      <SvgGoogle />
      Google
    </Button>
  );
}
