import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { sendEmail } from "./mailer";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
  plugins: [tanstackStartCookies()],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      void sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `<p>Click <a href="${url}">here</a> to verify your email</p>`,
      });
    },
    sendOnSignUp: true,
    async afterEmailVerification(user) {
      await db.insert(schema.userAdditionalInfo).values({
        userId: user.id,
      });
      await db
        .update(schema.user)
        .set({ verifiedAt: new Date() })
        .where(eq(schema.user.id, user.id));
    },
    autoSignInAfterVerification: true,
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
});
