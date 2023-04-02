import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  Form,
  routeAction$,
  routeLoader$,
  zod$,
  z,
} from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import SettingsForm from "~/components/settings-form";
import { eventSettingsFields } from "~/config/preview-settings";
import { callApi, getAccessTokenFromCookie } from "~/utils/fetch";

export const usePreviewDataLoader = routeLoader$(
  async ({ cookie, env, params, redirect }) => {
    const authState = getAccessTokenFromCookie(cookie);
    if (!authState?.access_token) {
      throw redirect(302, "/login");
    }
    const baseUrl = env.get("VITE_API_URL") as string;
    const result: any = await callApi(
      {
        endpoint: `/accounts/user/events/${params?.id}`,
        method: "GET",
      },
      baseUrl,
      cookie
    );

    const { data } = result;

    if (data?.slug !== params.slug) {
      throw redirect(302, `/preview/${data?.slug}/p/${params?.id}`);
    }

    return data;
  }
);

export const usePublishEventAction = routeAction$(
  async (data, { fail, env, cookie, redirect }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      const result: any = await callApi(
        {
          endpoint: `/events/publish`,
          method: "POST",
          body: data,
        },
        baseUrl,
        cookie
      );

      if (result?.error) {
        return fail(403, {
          message: result?.error?.message,
        });
      }
      throw redirect(302, `/${result?.data?.slug}/p/${data?.id}`);
    } catch (e) {
      return fail(403, {
        message: "Server Error!",
      });
    }
  },
  zod$({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    total_seats: z.coerce.number().min(2),
    location_name: z.string(),
    area_name: z.string(),
    formatted_address: z.string(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    photos: z.string(),
  })
);

export const useAppDetails = routeLoader$(({ env }) => {
  const baseUrl = env.get("VITE_API_URL");
  return {
    baseUrl,
  };
});

export default component$(() => {
  const previewData = usePreviewDataLoader();
  const appDetails = useAppDetails();
  const publish = usePublishEventAction();

  return (
    <div class="mx-auto lg:px-8 sm:px-8 mt-24 md:mt-8 mb-32 container mx-auto">
      <h2 class="flex text-2xl font-semibold text-secondary">
        Update your Application
      </h2>
      <Form spaReset class="mt-8 block max-w-xl" action={publish}>
        <SettingsForm
          baseUrl={appDetails.value.baseUrl as string}
          schema={eventSettingsFields}
          defaultValues={{
            ...previewData.value,
          }}
          fieldErrors={publish.value?.fieldErrors}
        />
        {publish.value?.failed && (
          <p class="text-red-500 text-xs italic">{publish.value?.message}</p>
        )}
        <Button
          type="submit"
          styles="mt-8"
          label="Publish"
          isRunning={publish.isRunning}
        />
      </Form>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const previewData = resolveValue(usePreviewDataLoader);
  return {
    title: `Event Details | ${previewData.event?.name}`,
    meta: [
      {
        name: "description",
        content: previewData.event?.description,
      },
    ],
  };
};
