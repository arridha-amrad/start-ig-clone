import db from "@/lib/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { verifyUser } from "./db/repositories/users/afterVerification";
import { sendEmail } from "./mailer";
import { env } from "@/env";

export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
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
    afterEmailVerification: async (user) => {
      verifyUser(user.id);
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
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!user.username) {
            const baseUsername = user.email.split("@")[0];
            const randomSuffix = Math.floor(Math.random() * 1000);
            return {
              data: {
                ...user,
                username: `${baseUsername}${randomSuffix}`,
              },
            };
          }
          return { data: user };
        },
      },
    },
  },
  socialProviders: {
    google: {
      enabled: true,
      prompt: "select_account",
      clientId: env.googleClientId!,
      clientSecret: env.googleClientSecret!,
    },
  },
});
