CREATE TYPE "public"."gender_options_enum" AS ENUM('-', 'female', 'male');--> statement-breakpoint
CREATE TABLE "user_additional_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"gender" "gender_options_enum" DEFAULT '-' NOT NULL,
	"website" text,
	"bio" text,
	"is_show_thread_badge" boolean DEFAULT false,
	"is_show_account_suggestion" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "user_additional_info" ADD CONSTRAINT "user_additional_info_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;