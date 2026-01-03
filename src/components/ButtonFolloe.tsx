import { profileQueryOptions } from "@/query-options";
import { cn } from "@/utils";
import { Button } from "@headlessui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "@tanstack/react-router";

const ButtonFollow = () => {
  const { username } = useParams({ from: "/_optionalAuth/$username" });
  const { data: profile } = useSuspenseQuery(profileQueryOptions(username));

  const pathname = useLocation().pathname;

  const follow = async () => {};

  if (!profile) return null;

  return (
    <Button
      onClick={follow}
      // className={cn(
      //   (profile.isFollowed || profile.isFollowRequested) && "bg-bg-secondary"
      // )}
      // isLoading={isPending}
      type="submit"
    >
      <span>{"follow"}</span>
    </Button>
  );
};

export default ButtonFollow;
