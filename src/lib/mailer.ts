import { env } from "@/env";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: env.googleUser,
    clientId: env.googleClientId,
    clientSecret: env.googleClientSecret,
    refreshToken: env.googleRefreshToken,
  },
});

type Args = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail(args: Args) {
  const { html, subject, to } = args;
  await transporter.sendMail({
    to,
    subject,
    html,
  });
}
