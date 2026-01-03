import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";

import AvatarEditable from "./AvatarEditable";
import { useSuspenseQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "@/query-options";
import { Link, useParams } from "@tanstack/react-router";
import ProfileSettings from "./ProfileSettings";
import ButtonFollow from "./ButtonFolloe";

export default function Profile() {
  const { username } = useParams({ from: "/_optionalAuth/$username" });

  const { data: profile } = useSuspenseQuery(profileQueryOptions(username));

  const isAuthUser = profile?.username === username;

  // const canViewFollowingList =
  //   isAuthUser || !profile.isProtected || profile.isFollowed;

  return (
    <section className="mt-10 flex flex-col sm:grid sm:grid-cols-3 md:mt-0">
      <div className="flex items-center justify-start px-4 sm:justify-center">
        {isAuthUser ? (
          <AvatarEditable />
        ) : (
          <AvatarWithStoryIndicator
            isStoryExists={false}
            isStoryWatched={false}
            size={150}
            avatarUrl={profile?.image ?? "/default.jpg"}
          />
        )}
      </div>
      <div className="mt-4 px-4 sm:col-span-2 sm:mt-0 sm:px-0">
        <div className="flex items-center gap-4">
          <h1 className="text-xl">{profile?.username}</h1>
          {isAuthUser ? (
            <>
              <Link
                to="/"
                className="bg-bg-secondary flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm leading-5 font-medium transition-all duration-200 ease-linear disabled:brightness-125"
              >
                Edit Profile
              </Link>

              <ProfileSettings />
            </>
          ) : (
            <ButtonFollow />
          )}
        </div>
        <div className="flex items-center gap-10 py-4">
          <ProfilePostFollowersFollowings label="Posts" total={10} />
          {/* {canViewFollowingList ? (
            <Link scroll={false} href={`/${username}/followers`}>
              <ProfilePostFollowersFollowings
                label="Followers"
                total={profile.sumFollowers}
              />
            </Link>
          ) : (
            <ProfilePostFollowersFollowings
              label={t("followers")}
              total={profile.sumFollowers}
            />
          )}

          {canViewFollowingList ? (
            <Link scroll={false} href={`/${username}/followings`}>
              <ProfilePostFollowersFollowings
                label={t("followings")}
                total={profile.sumFollowings}
              />
            </Link>
          ) : (
            <ProfilePostFollowersFollowings
              label={t("followings")}
              total={profile.sumFollowings}
            />
          )} */}
        </div>

        <div className="spacey-2 text-sm">
          <div className="flex items-center gap-1">
            <h1 className="font-medium">{profile?.name}</h1>
          </div>
          {/* <div className="text-foreground/70">{profile?.occupation}</div>
          <div className="whitespace-pre-line">{profile?.bio}</div> */}
          {/* <div>
            <a
              target="_blank"
              className="font-semibold text-blue-500"
              href="https://www.google.com"
            >
              {profile.website}
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}

const ProfilePostFollowersFollowings = ({
  label,
  total,
}: {
  total: number;
  label: string;
}) => {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <p className="font-semibold">{total}</p>
      <p className="text-foreground/70">{label}</p>
    </div>
  );
};
