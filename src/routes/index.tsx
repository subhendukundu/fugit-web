import { component$, useSignal, useTask$ } from "@builder.io/qwik";
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
      if (!result?.error) {
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
  const searchedText = search?.formData?.get("search") as string;
  const reset = useSignal<boolean>(!searchedText);
  const appDetails = useAppDetails();
  const event = useCreateEventAction();

  useTask$(({ track }) => {
    track(() => search?.isRunning);
    if (!search?.isRunning) {
      reset.value = false;
    }
  });

  return (
    <>
      {!search.value || reset.value ? (
        <Landing action={search} loading={search.isRunning} />
      ) : (
        <>
          <button
            type="button"
            class="mb-8 mt-12 text-text border border-opacity-30 border-primary hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
            onClick$={() => (reset.value = true)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
            </svg>
            <span class="sr-only">Icon description</span>
          </button>
          {search?.value?.results ? (
            <SearchResults
              baseUrl={appDetails.value.baseUrl as string}
              action={event}
              results={search?.value?.results}
              loggedIn={appDetails?.value?.loggedIn}
              title={searchedText}
            />
          ) : (
            <>
              <div class="bg-red-500 text-white p-2 mt-2">
                Unexpected error, please retry!
              </div>
              <button
                onClick$={() =>
                  search.submit({
                    search: searchedText,
                  })
                }
                class="mt-8 py-2 px-8 text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
              >
                Retry
              </button>
            </>
          )}
        </>
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
