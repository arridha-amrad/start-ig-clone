import DividerOr from "@/components/DividerOr";
import { useAppForm } from "@/hooks/form-hook";
import { authClient } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import GithubAuthButton from "./LoginWithGithub";
import GoogleAuthButton from "./LoginWithGoogle";

const schema = z.object({
  email: z.email(),
  password: z.string().min(1, "password is required"),
});

export default function FormLogin() {
  const [error, setError] = useState("");

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } as z.infer<typeof schema>,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value: { email, password } }) => {
      setError("");
      await authClient.signIn.email(
        {
          email,
          password,
          rememberMe: true,
          callbackURL: "/",
        },
        {
          onError({ error }) {
            setError(error.message);
          },
        }
      );
    },
  });

  return (
    <fieldset disabled={form.state.isSubmitting}>
      {error && (
        <div className="mb-4">
          <p className="text-red-400 text-center text-sm">{error}</p>
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
          name="email"
          children={(field) => <field.TextField label="Email" />}
        />
        <form.AppField name="password">
          {(field) => <field.PasswordField />}
        </form.AppField>
        <div className="mt-4">
          <form.AppForm>
            <form.SubmitButton label="Login" />
          </form.AppForm>
        </div>
      </form>

      <DividerOr />

      <div className="flex gap-4 items-center justify-center mb-4">
        <GoogleAuthButton />
        <GithubAuthButton />
      </div>

      <div className="text-center my-4">
        <Link className="text-sm font-medium" to="/auth/forgot-password">
          Forgot Password?
        </Link>
      </div>

      <div className="flex items-center justify-center font-medium text-sm my-8">
        <span>Don't have an account ?&nbsp;</span>
        <Link className="text-sky-500" to="/auth/signup">
          Sign Up
        </Link>
      </div>
    </fieldset>
  );
}
