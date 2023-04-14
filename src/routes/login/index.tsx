import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import { signIn } from "~/utils/auth";
import { Loader3 as HeroImage } from "~/components/icons/loader";
import { socialTags } from "~/config/social-tags";

export const useSigninAction = routeAction$(
  async (data, { cookie, fail, redirect, env }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      const result = await signIn(data, cookie, baseUrl);
      if (result instanceof Error) {
        return fail(403, {
          message: "Invalid username or password",
        });
      }

      throw redirect(302, "/");
    } catch (e) {
      return fail(403, {
        message: "Invalid username or password",
      });
    }
  },
  zod$({
    email: z.string(),
    password: z.string(),
  })
);

export default component$(() => {
  const localState: any = useStore({
    showPassword: undefined,
    status: "error",
  });
  const { showPassword } = localState;
  const signIn = useSigninAction();

  return (
    <>
      <div class="flex flex-1 flex-col lg:flex-row">
        <Form
          class="flex-1 lg:max-w-lg lg:mx-auto mt-16"
          action={signIn}
          spaReset
        >
          <h1 class="text-3xl font-medium text-secondary">
            Welcome back, quirky friend!
          </h1>
          <label class="block space-y-2 mt-12">
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              class="w-full px-3 py-2 text-sm border border-opacity-30 border-primary rounded"
            />
            {signIn.value?.fieldErrors?.email && (
              <p class="text-red-500 text-xs italic">
                {signIn.value?.fieldErrors?.email}
              </p>
            )}
          </label>
          <label class="block relative space-y-2 mt-8">
            <input
              required
              minLength={8}
              name="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              class="w-full pl-3 pr-10 py-2 text-sm border border-opacity-30 border-primary rounded"
            />
            {signIn.value?.fieldErrors?.password && (
              <p class="text-red-500 text-xs italic">
                {signIn.value?.fieldErrors?.password}
              </p>
            )}
            <div
              class="absolute top-0 right-4 text-gray-400 dark:text-gray-600 cursor-pointer"
              onClick$={() => (localState.showPassword = !showPassword)}
              aria-hidden="true"
            >
              {showPassword ? "Hide" : "Show"}
            </div>
          </label>
          {signIn.value?.failed && (
            <p class="text-red-500 text-xs italic">{signIn.value?.message}</p>
          )}
          <Button
            isRunning={signIn.isRunning}
            type="submit"
            label="Login"
            styles="mt-8 w-full bg-primary"
          />
          <div class="flex justify-between pt-6 text-sm">
            <Link href="/login" class="hover:opacity-75">
              Reset Password
            </Link>
            <Link href="/register" class="hover:opacity-75">
              Register
            </Link>
          </div>
        </Form>
        <div class="flex-1 lg:max-w-lg lg:mx-auto">
          <HeroImage />
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Fugit | Login",
  meta: [
    {
      name: "description",
      content:
        "Log in to Fugit and connect with like-minded people who share your passion for exploring new places and trying new things! Don't have an account? Sign up for Fugit today!",
    },
    {
      name: "keywords",
      content:
        "Fugit, login, sign in, social app, tribe, adventure, explore, connect, meet, like-minded",
    },
    ...socialTags,
  ],
};
