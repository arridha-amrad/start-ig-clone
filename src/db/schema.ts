import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  uuid,
  unique,
  pgEnum,
  integer,
  primaryKey,
  check,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  // additional fields
  username: text("username").notNull().unique(),
  imagePublicId: text("image_pub_id"),
  isProtected: boolean("is_protected").default(false).notNull(),
  verifiedAt: timestamp("verified_at"),
});
export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  additionalInfo: one(userAdditionalInfo),
  // Orang-orang yang diikuti oleh user ini
  following: many(follows, { relationName: "following" }),
  // Orang-orang yang mengikuti user ini (pengikut)
  followers: many(follows, { relationName: "followers" }),
}));

export const follows = pgTable(
  "follows",
  {
    followerId: text("follower_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    followingId: text("following_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    // // 1. Composite Primary Key: avoid duplication of follow-data
    primaryKey({ columns: [table.followerId, table.followingId] }),
    // // 2. Check Constraint: prevent user from follow itself
    check("no_self_follow", sql`${table.followerId} <> ${table.followingId}`),
  ]
);
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

export const genderEnum = pgEnum("gender_options_enum", [
  "-",
  "female",
  "male",
]);
export const userAdditionalInfo = pgTable("user_additional_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .unique()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  gender: genderEnum("gender").notNull().default("-"),
  website: text("website"),
  bio: text("bio"),
  isShowThreadBadge: boolean("is_show_thread_badge").default(false),
  isShowAccountSuggestion: boolean("is_show_account_suggestion").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
export const userAdditionalInfoRelation = relations(
  userAdditionalInfo,
  ({ one }) => ({
    user: one(user, {
      fields: [userAdditionalInfo.userId],
      references: [user.id],
    }),
  })
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const post = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  caption: text("caption"),
  location: text("location"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  aspectRatio: text("aspect_ratio").default("1:1").notNull(),
});
export const postRelations = relations(post, ({ one, many }) => ({
  owner: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
  media: many(postMedia), // Satu post punya banyak media
  likes: many(postLike),
}));

export const mediaTypeEnum = pgEnum("media_type", ["image", "video"]);
export const postMedia = pgTable("post_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  type: mediaTypeEnum("type").notNull().default("image"),
  order: integer("order").notNull().default(0), // Untuk urutan slide (1, 2, 3...)
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export const postMediaRelations = relations(postMedia, ({ one }) => ({
  post: one(post, {
    fields: [postMedia.postId],
    references: [post.id],
  }),
}));

export const postLike = pgTable(
  "post_like",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: uuid("post_id")
      .notNull()
      .references(() => post.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [unique().on(table.userId, table.postId)]
);
export const postLikeRelations = relations(postLike, ({ one }) => ({
  post: one(post, {
    fields: [postLike.postId],
    references: [post.id],
  }),
}));

// ================== RELATIONS ===============

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
