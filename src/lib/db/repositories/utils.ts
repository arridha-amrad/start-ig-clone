import { AnyColumn, sql } from "drizzle-orm";

export function isPostLiked(postId: AnyColumn, authUserId?: string) {
  return !!authUserId
    ? sql<boolean>`(
        SELECT EXISTS(
          SELECT 1
          FROM "post_like"
          WHERE "post_like"."post_id" = ${postId}
          AND "post_like"."user_id" = ${authUserId}
        )
      )`.as("is_liked")
    : sql<boolean>`false`.as("is_liked");
}

export function isCommentLiked(commentId: AnyColumn, authUserId?: string) {
  return !!authUserId
    ? sql<boolean>`(
        SELECT EXISTS(
          SELECT 1
          FROM "comment_like"
          WHERE "comment_like"."comment_id" = ${commentId}
          AND "comment_like"."user_id" = ${authUserId}
        )
      )`.as("is_liked")
    : sql<boolean>`false`.as("is_liked");
}

export function countPostTotalLikes(postId: AnyColumn) {
  return sql<number>`(
    SELECT COUNT(*)
    FROM "post_like"
    WHERE "post_like"."post_id" = ${postId}
  )`.as("total_likes");
}

export function countCommentTotalLikes(commentId: AnyColumn) {
  return sql<number>`(
    SELECT COUNT(*)
    FROM "comment_like"
    WHERE "comment_like"."comment_id" = ${commentId}
  )`.as("total_likes");
}

export function countTotalReplies(commentId: AnyColumn) {
  return sql<number>`(
    SELECT COUNT(*)
    FROM "comments" AS "replies"
    WHERE "replies"."parent_id" = ${commentId}
  )`.as("total_replies");
}

export function amIFollowingYou(userId: AnyColumn, authUserId?: string) {
  return authUserId
    ? sql<boolean>`(
      SELECT EXISTS (
        SELECT 1 
        FROM "follows" 
        WHERE "follows"."follower_id" = ${authUserId} 
        AND "follows"."following_id" = ${userId}
      )
    )`.as("is_following")
    : sql<boolean>`false`.as("is_following");
}
