import { OptionsButton as SidebarOptionsButton } from "@/components/Sidebar";
import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

type Props = {
  startTransition: (callback: () => void) => void;
};

export function ButtonLogout({ startTransition }: Props) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      startTransition(async () => {
        const result = await authClient.signOut();
        if (result.data?.success) {
          qc.clear();
          navigate({ to: "/auth/login", replace: true });
        } else {
          const err = result.error?.message || "failed to logout";
          toast.error(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return <SidebarOptionsButton onClick={logout} label="Logout" />;
}
