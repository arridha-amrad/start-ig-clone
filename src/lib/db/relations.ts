import { relations } from "drizzle-orm";
import {
  comments,
  user,
  post,
  account,
  follows,
  session,
  userAdditionalInfo,
  postLike,
  postMedia,
  commentLike,
} from "./tables";

// Defining Relations for easier querying
export const commentsRelations = relations(comments, ({ one, many }) => ({
  // A comment belongs to a user
  user: one(user, {
    fields: [comments.userId],
    references: [user.id],
  }),
  // A comment belongs to a post
  post: one(post, {
    fields: [comments.postId],
    references: [post.id],
  }),
  // A comment can have many replies
  replies: many(comments, { relationName: "threaded_comments" }),
  // A reply belongs to one parent comment
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "threaded_comments",
  }),
  likes: many(commentLike),
}));

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  additionalInfo: one(userAdditionalInfo),
  // Orang-orang yang diikuti oleh user ini
  following: many(follows, { relationName: "following" }),
  // Orang-orang yang mengikuti user ini (pengikut)
  followers: many(follows, { relationName: "followers" }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(user, {
    fields: [follows.followerId],
    references: [user.id],
    relationName: "following",
  }),
  following: one(user, {
    fields: [follows.followingId],
    references: [user.id],
    relationName: "followers",
  }),
}));

export const userAdditionalInfoRelation = relations(
  userAdditionalInfo,
  ({ one }) => ({
    user: one(user, {
      fields: [userAdditionalInfo.userId],
      references: [user.id],
    }),
  })
);

export const postRelations = relations(post, ({ one, many }) => ({
  owner: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
  media: many(postMedia), // Satu post punya banyak media
  likes: many(postLike),
  comments: many(comments),
}));

export const postMediaRelations = relations(postMedia, ({ one }) => ({
  post: one(post, {
    fields: [postMedia.postId],
    references: [post.id],
  }),
}));

export const postLikeRelations = relations(postLike, ({ one }) => ({
  post: one(post, {
    fields: [postLike.postId],
    references: [post.id],
  }),
}));

export const commentLikeRelations = relations(commentLike, ({ one }) => ({
  comment: one(comments, {
    fields: [commentLike.commentId],
    references: [comments.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
