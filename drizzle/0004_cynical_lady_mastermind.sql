ALTER TABLE "post" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "post_like" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "post_like" RENAME COLUMN "postId" TO "post_id";--> statement-breakpoint
ALTER TABLE "post_media" RENAME COLUMN "postId" TO "post_id";--> statement-breakpoint
ALTER TABLE "post_like" DROP CONSTRAINT "post_like_userId_postId_unique";--> statement-breakpoint
ALTER TABLE "post" DROP CONSTRAINT "post_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "post_like" DROP CONSTRAINT "post_like_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "post_like" DROP CONSTRAINT "post_like_postId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "post_media" DROP CONSTRAINT "post_media_postId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_media" ADD CONSTRAINT "post_media_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_user_id_post_id_unique" UNIQUE("user_id","post_id");