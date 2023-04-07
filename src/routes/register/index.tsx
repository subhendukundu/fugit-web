import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import { register } from "~/utils/auth";
import { Loader5 as HeroImage } from "~/components/icons/loader";
import type { ErrorResponse } from "~/utils/fetch";
import { socialTags } from "~/config/social-tags";

export const useRegisterAction = routeAction$(
  async (data, { cookie, fail, redirect, env }) => {
    const { name, email, confirm_password, password } = data;
    if (confirm_password !== password) {
      return fail(403, {
        message: "The password and confirm password fields must match.",
      });
    }
    const baseUrl = env.get("VITE_API_URL") as string;
    const result = await register(
      {
        email,
        password,
        name,
      },
      cookie,
      baseUrl
    );
    if ((result as ErrorResponse).error) {
      return fail(403, {
        message: (result as ErrorResponse)?.error?.message,
      });
    }

    throw redirect(302, "/");
  },
  zod$({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
);

export default component$(() => {
  const localState: any = useStore({
    showPassword: undefined,
    status: "error",
  });
  const { showPassword } = localState;
  const register = useRegisterAction();

  return (
    <>
      <div class="flex flex-1 flex-col lg:flex-row">
        <Form
          class="flex-1 lg:max-w-lg lg:mx-auto mt-16"
          action={register}
          spaReset
        >
          <h1 class="text-3xl font-medium text-secondary">
            Ready to connect with other quirky souls?
          </h1>
          <label class="block space-y-2 mt-12">
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              class="w-full px-3 py-2 text-sm border border-opacity-30 border-primary rounded"
            />
            {register.value?.fieldErrors?.email && (
              <p class="text-red-500 text-xs italic">
                {register.value?.fieldErrors?.email}
              </p>
            )}
          </label>
          <label class="block space-y-2 mt-8">
            <input
              required
              type="text"
              name="name"
              placeholder="Name"
              class="w-full px-3 py-2 text-sm border border-opacity-30 border-primary rounded"
            />
            {register.value?.fieldErrors?.name && (
              <p class="text-red-500 text-xs italic">
                {register.value?.fieldErrors?.name}
              </p>
            )}
          </label>
          <label class="block relative space-y-2 mt-8">
            <input
              required
              minLength={8}
              name="password"
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              class="w-full pl-3 pr-10 py-2 text-sm border border-opacity-30 border-primary rounded"
            />
            {register.value?.fieldErrors?.password && (
              <p class="text-red-500 text-xs italic">
                {register.value?.fieldErrors?.password}
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
          <label class="block relative space-y-2 mt-8">
            <input
              required
              minLength={8}
              name="confirm_password"
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              class="w-full pl-3 pr-10 py-2 text-sm border border-opacity-30 border-primary rounded"
            />
            {register.value?.fieldErrors?.confirm_password && (
              <p class="text-red-500 text-xs italic">
                {register.value?.fieldErrors?.confirm_password}
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
          {register.value?.failed && (
            <p class="text-red-500 text-xs italic">{register.value?.message}</p>
          )}
          <Button
            isRunning={register.isRunning}
            type="submit"
            label="Register"
            styles="mt-8 w-full bg-primary"
          />
          <p class="mt-4 text-base">
            Already have an account?
            <Link
              href="/login"
              class="font-base text-primary transition-all duration-200 hover:underline hover:opacity-75 ml-2"
            >
              Login
            </Link>
          </p>
        </Form>
        <div class="flex-1 lg:max-w-lg lg:mx-auto">
          <HeroImage />
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Fugit - Register for Adventure",
  meta: [
    {
      name: "description",
      content:
        "Join the Fugit community and unlock a world of adventure! Our AI-powered platform connects you with like-minded individuals who share your passion for exploring new places and trying new things. Create a profile, connect with friends, and discover unforgettable experiences today!",
    },
    {
      name: "keywords",
      content:
        "Fugit, register, sign up, adventure, community, profile, friends, experiences",
    },
    ...socialTags
  ],
};
