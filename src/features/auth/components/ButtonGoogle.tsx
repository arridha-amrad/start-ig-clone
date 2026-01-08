import SvgGoogle from "@/components/svg/Google";
import { Button } from "@headlessui/react";

export default function GoogleAuthButton() {
  return (
    <Button className="border-foreground/20 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-foreground">
      <SvgGoogle />
      Google
    </Button>
  );
}
