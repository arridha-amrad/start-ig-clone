import DividerOr from "@/components/DividerOr";
import { InstagramText } from "@/components/svg/Instagram";
import { useAppForm } from "@/hooks/form-hook";
import { authClient } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import GithubAuthButton from "./LoginWithGithub";
import GoogleAuthButton from "./LoginWithGoogle";

const schema = z.object({
  email: z.email(),
  password: z.string().min(5, "password too short"),
  username: z.string().min(1, "username is required"),
  fullname: z.string().min(1, "fullname is required"),
});

export default function FormSignup() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const form = useAppForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
    } as z.infer<typeof schema>,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value: { email, fullname, password, username } }) => {
      setError("");
      setMessage("");
      await authClient.signUp.email(
        {
          email,
          name: fullname,
          password,
          username,
        },
        {
          onError({ error }) {
            setError(error.message);
          },
          onSuccess: () => {
            setMessage("Check your email for verification");
          },
        }
      );
    },
  });

  return (
    <fieldset disabled={false}>
      <div className="border w-full border-foreground/20 rounded-lg px-4 py-6">
        <div className="space-y-4 flex flex-col items-center justify-center">
          <InstagramText isBig />
          <p className="font-semibold text-foreground/50 text-center">
            Sign up to see photos and videos from your friends.
          </p>
        </div>
        <div className="flex gap-4 items-center justify-center my-4">
          <GoogleAuthButton />
          <GithubAuthButton />
        </div>
        <DividerOr />
        {!!error && (
          <div className="mb-4">
            <p className="text-center text-xs font-light text-red-500">
              {error}
            </p>
          </div>
        )}
        {!!message && (
          <div className="mb-4">
            <p className="text-center text-xs font-light text-green-500">
              {message}
            </p>
          </div>
        )}
        <form
          className="w-full space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppField
            name="fullname"
            children={(field) => <field.TextField label="Fullname" />}
          />
          <form.AppField name="email">
            {(field) => <field.TextField label="Email" />}
          </form.AppField>
          <form.AppField name="password">
            {(field) => <field.PasswordField />}
          </form.AppField>
          <form.AppField name="username">
            {(field) => <field.TextField label="Username" />}
          </form.AppField>
          <div className="mt-4">
            <p className="text-center text-xs font-light text-foreground/50">
              People who use our service may have uploaded your contact
              information to Instagram. Learn More
            </p>
          </div>
          <div className="my-4">
            <p className="text-center text-xs font-light text-foreground/50">
              By signing up, you agree to our Terms , Privacy Policy and Cookies
              Policy .
            </p>
          </div>
          <div className="mt-4">
            <form.AppForm>
              <form.SubmitButton label="Sign Up" />
            </form.AppForm>
          </div>
        </form>
      </div>

      <div className="border-foreground/20 flex w-full max-w-sm items-center justify-center mt-4 border rounded-lg py-6">
        <p className="text-sm">
          Have an account ?&nbsp;
          <Link className="text-sky-500" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </fieldset>
  );
}
