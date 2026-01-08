import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow, TProfile } from "./services";
import { userKeys } from "./queries";
import toast from "react-hot-toast";

type Params = {
  userId: string;
  username?: string;
};

export const useFollowMutation = ({ userId, username }: Params) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => follow({ data: { userId } }),
    onMutate: async () => {
      if (username) {
        await qc.cancelQueries({
          queryKey: userKeys.profile(username),
        });

        qc.setQueryData(
          userKeys.profile(username),
          (prev: TProfile | undefined) => {
            if (!prev) return;
            return {
              ...prev,
              isFollowing: !prev.isFollowing,
            };
          }
        );
      }

      const profileOldData = username
        ? qc.getQueryData<TProfile | undefined>(userKeys.profile(username))
        : undefined;

      return {
        profileOldData,
      };
    },
    onError: (err, __, onMutateResult) => {
      if (onMutateResult?.profileOldData && username) {
        qc.setQueryData(
          userKeys.profile(username),
          onMutateResult.profileOldData
        );
      }
      console.log(err.message);
      toast.error("Failed to follow user");
    },
    onSettled: () => {
      if (username) {
        qc.invalidateQueries({
          queryKey: userKeys.profile(username),
          refetchType: "none",
        });
      }
    },
  });
};
