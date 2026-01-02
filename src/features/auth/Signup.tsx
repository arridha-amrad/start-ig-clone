"use client";

import { PasswordFieldForAuth, TextFieldForAuth } from "@/components/Input";
import { Button } from "@headlessui/react";
import GoogleAuthButton from "./LoginWithGoogle";
import GithubAuthButton from "./LoginWithGithub";
import DividerOr from "@/components/DividerOr";
import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { InstagramText } from "@/components/svg/Instagram";

const initState = {
  message: "",
};

export default function FormSignup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

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
        {/* {!!state.message && (
          <div className="mb-4">
            <p className="text-center text-xs font-light text-green-500">
              {state.message}
            </p>
          </div>
        )} */}
        <form className="w-full space-y-2">
          <TextFieldForAuth
            name="email"
            label="Email"
            value={formState.email}
            onChange={handleChange}
          />
          <PasswordFieldForAuth
            onChange={handleChange}
            name="password"
            value={formState.password}
          />
          <TextFieldForAuth
            onChange={handleChange}
            name="fullname"
            label="Fullname"
            value={formState.fullname}
          />
          <TextFieldForAuth
            onChange={handleChange}
            name="username"
            label="Username"
            value={formState.username}
          />
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
            <Button
              type="submit"
              className="disabled:bg-bg-secondary bg-skin-primary mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium"
            >
              Sign Up
              {true && <Loader2 className="size-4 animate-spin" />}
            </Button>
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
