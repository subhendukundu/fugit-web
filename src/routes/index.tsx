import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { zod$, z, routeLoader$, routeAction$ } from "@builder.io/qwik-city";
import Landing from "~/components/landing/landing";
import SearchResults from "~/components/search-results/search-results";
import { socialTags } from "~/config/social-tags";
import { callApi, getAccessTokenFromCookie } from "~/utils/fetch";

export const useSearchAction = routeAction$(
  async (data, { fail, env }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      const result: any = await callApi(
        {
          endpoint: `/search?q=${data.search}`,
          method: "GET",
        },
        baseUrl
      );
      if (!result?.message) {
        return result;
      }
      return fail(403, {
        message: "Unexpected error, please refresh the page!",
      });
    } catch (e) {
      return fail(403, {
        message: "Server Error!",
      });
    }
  },
  zod$({
    search: z.string(),
  })
);

export const useCreateEventAction = routeAction$(
  async (data, { fail, env, cookie, redirect }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      const result: any = await callApi(
        {
          endpoint: `/accounts/user/events`,
          method: "POST",
          body: data,
        },
        baseUrl,
        cookie
      );
      if (result) {
        throw redirect(302, `/preview/${data.slug}/p/${result?.data?.id}`);
      }
      return fail(403, {
        message: "Unexpected error, please retry!",
      });
    } catch (e) {
      return fail(403, {
        message: "Server Error!",
      });
    }
  },
  zod$({
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    location_name: z.string(),
    area_name: z.string(),
    formatted_address: z.string(),
    place_id: z.string(),
    rating: z.number(),
    user_ratings_total: z.number(),
    photos: z.string(),
    geometry: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  })
);

export const useAppDetails = routeLoader$(({ env, cookie }) => {
  const baseUrl = env.get("VITE_API_URL");
  const authState = getAccessTokenFromCookie(cookie);
  return {
    baseUrl,
    loggedIn: !!authState?.access_token,
  };
});

export default component$(() => {
  const search = useSearchAction();
  const appDetails = useAppDetails();
  const event = useCreateEventAction();

  return (
    <>
      {search.value ? (
        search.value.failed ? (
          <div class="bg-red-500 text-white p-2 mt-2">
            Error: {search.value.failed}
          </div>
        ) : (
          <SearchResults
            baseUrl={appDetails.value.baseUrl as string}
            action={event}
            results={search?.value?.results}
            loggedIn={appDetails?.value?.loggedIn}
            title={search?.formData?.get("search") as string}
          />
        )
      ) : (
        <Landing action={search} loading={search.isRunning} />
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Fugit - Find Your Tribe, Join the Fun",
  meta: [
    {
      name: "description",
      content:
        "Ready for your next big adventure? Fugit is the app that helps you make it happen! Our AI-powered platform connects you with like-minded individuals who share your passion for exploring new places and trying new things. From hiking trails to hidden cafes, Fugit's personalized recommendations and social planning tools make it easy to create unforgettable memories.",
    },
    {
      name: "keywords",
      content:
        "Fugit, social app, find like-minded people, AI-powered platform, personalized recommendations, social planning tools, exploring new places, trying new things, unforgettable memories",
    },
    ...socialTags,
  ],
};
