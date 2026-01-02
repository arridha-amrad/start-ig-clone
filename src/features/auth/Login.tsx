"use client";

import DividerOr from "@/components/DividerOr";
import { PasswordFieldForAuth, TextFieldForAuth } from "@/components/Input";
import { Button } from "@headlessui/react";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import GithubAuthButton from "./LoginWithGithub";
import GoogleAuthButton from "./LoginWithGoogle";
import { Link, useNavigate } from "@tanstack/react-router";

export default function FormLogin() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   if (state.success) {
  //     router.replace("/");
  //   }
  // }, [state.success]);

  return (
    <fieldset disabled={false}>
      <div className="mb-4">
        <p className="text-red-400 text-center text-sm">{""}</p>
      </div>
      <form className="w-full space-y-2">
        <TextFieldForAuth
          name="email"
          label="Email"
          onChange={handleChange}
          value={formState.email}
          error={""}
        />
        <PasswordFieldForAuth
          name="password"
          value={formState.password}
          onChange={handleChange}
          error={""}
        />
        <div className="mt-4">
          <Button
            type="submit"
            className="disabled:bg-bg-secondary bg-skin-primary mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium"
          >
            Login
            {true && <Loader2 className="size-4 animate-spin" />}
          </Button>
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
