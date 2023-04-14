import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import {
  verify,
  confirm,
  refreshAndSaveAccessToken,
} from "~/utils/auth";
import { Loader5 as HeroImage } from "~/components/icons/loader";
import type { ErrorResponse } from "~/utils/fetch";
import { socialTags } from "~/config/social-tags";

export const useSendCodeAction = routeAction$(
  async (data, { cookie, env }) => {
    const baseUrl = env.get("VITE_API_URL") as string;
    const result = await verify(cookie, baseUrl);
    if ((result as ErrorResponse).error) {
      const { error } = result as ErrorResponse;
      return {
        suceess: false,
        message: error?.message,
      };
    }
    return {
      suceess: true,
      message: "",
    };
  }
);

export const useConfirmCodeAction = routeAction$(
  async (data, { cookie, fail, redirect, env }) => {
    const baseUrl = env.get("VITE_API_URL") as string;
    const result = await confirm(data, cookie, baseUrl);
    if ((result as ErrorResponse).error) {
      const { error } = result as ErrorResponse;
      return fail(403, {
        message: error?.message,
      });
    }
    await refreshAndSaveAccessToken(cookie, baseUrl);
    throw redirect(302, "/");
  },
  zod$({
    code: z.string(),
  })
);

export default component$(() => {
  const confirmEmail = useConfirmCodeAction();
  const sendAction = useSendCodeAction();

  return (
    <>
      <div class="flex flex-1 flex-col lg:flex-row">
        {sendAction.value?.suceess ? (
          <Form
            class="flex-1 lg:max-w-lg lg:mx-auto mt-16"
            action={confirmEmail}
            spaReset
          >
            <h1 class="text-3xl font-medium text-secondary">
              One step closer to quirky connections.
            </h1>
            <label class="block space-y-2 mt-12">
              <input
                required
                type="text"
                name="code"
                placeholder="Code"
                class="w-full px-3 py-2 text-sm border border-opacity-30 border-primary rounded"
              />
              {confirmEmail.value?.fieldErrors?.code && (
                <p class="text-red-500 text-xs italic">
                  {confirmEmail.value?.fieldErrors?.code}
                </p>
              )}
            </label>
            {confirmEmail.value?.failed && (
              <p class="text-red-500 text-xs italic">
                {confirmEmail.value?.message}
              </p>
            )}
            <Button
              isRunning={confirmEmail.isRunning}
              type="submit"
              label="Verify code"
              styles="mt-8 w-full bg-primary"
            />
          </Form>
        ) : (
          <Form
            class="flex-1 lg:max-w-lg lg:mx-auto mt-16"
            action={sendAction}
            spaReset
          >
            <h1 class="text-3xl font-medium text-secondary">
              Verify and let's get quirky!
            </h1>
            <Button
              isRunning={sendAction.isRunning}
              type="submit"
              label="Send code"
              styles="mt-8 w-full bg-primary"
            />
            {sendAction.value?.message && (
              <p class="text-red-500 text-xs italic">
                {sendAction.value?.message}
              </p>
            )}
          </Form>
        )}
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
    ...socialTags,
  ],
};
