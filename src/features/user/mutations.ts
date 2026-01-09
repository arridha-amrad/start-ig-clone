import { useMutation, useQueryClient } from "@tanstack/react-query";
import { follow, TProfile, TSuggestedUser } from "./services";
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
      // profile
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

      // suggested users
      qc.setQueryData(
        [userKeys.suggestedUsers],
        (prev: TSuggestedUser[] | undefined) => {
          if (!prev) return;
          return prev.map((user) =>
            user.id !== userId
              ? user
              : {
                  ...user,
                  isFollowing: !user.isFollowing,
                }
          );
        }
      );
      const suggestedUsersOldData = qc.getQueryData<TSuggestedUser[]>([
        userKeys.suggestedUsers,
      ]);

      return {
        profileOldData,
        suggestedUsersOldData,
      };
    },
    onError: (err, __, onMutateResult) => {
      if (onMutateResult?.profileOldData && username) {
        qc.setQueryData(
          userKeys.profile(username),
          onMutateResult.profileOldData
        );
      }
      if (onMutateResult?.suggestedUsersOldData) {
        qc.setQueryData(
          [userKeys.suggestedUsers],
          onMutateResult.suggestedUsersOldData
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
      qc.invalidateQueries({
        queryKey: [userKeys.suggestedUsers],
        refetchType: "none",
      });
    },
  });
};
