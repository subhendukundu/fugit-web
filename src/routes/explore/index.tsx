import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import EventCard from "~/components/event-card/event-card";
import { NotFoundIcon } from "~/components/icons/not-found";
import Loader from "~/components/loader/loader";
import type { Event } from "~/types";
import { callApi } from "~/utils/fetch";

export const useBaseUrl = routeLoader$(({ env }) => {
  const baseUrl = env.get("VITE_API_URL");
  return {
    baseUrl,
  };
});

export const useExploreDetails = routeLoader$(async ({ env }) => {
  try {
    const baseUrl = env.get("VITE_API_URL") as string;
    const result: any = await callApi(
      {
        endpoint: `/explore`,
        method: "GET",
      },
      baseUrl
    );
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
});

export const useSearchExploreAction = routeAction$(
  async (data, { fail, env }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      const result: any = await callApi(
        {
          endpoint: `/explore?q=${data.search}`,
          method: "GET",
        },
        baseUrl
      );
      if (result) {
        return result;
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
    search: z.string(),
  })
);

export default component$(() => {
  const baseUrl = useBaseUrl();
  const search = useSignal("");
  const exploreResource = useResource$(async ({ track, cleanup }) => {
    const searchInput = track(() => search.value);
    const controller = new AbortController();
    cleanup(() => controller.abort());

    const result: Event[] = await callApi(
      {
        endpoint: search?.value ? `/explore?q=${searchInput}` : "/explore",
        method: "GET",
      },
      baseUrl.value?.baseUrl as string
    );
    return result;
  });

  return (
    <Resource
      value={exploreResource}
      onPending={() => <Loader />}
      onRejected={() => <div>Failed to fetch Events</div>}
      onResolved={(data: any) => {
        return data.length ? (
          <div class="flex-1 mt-20 mb-20">
            <form
              class="flex justify-center items-center flex-col sm:flex-row"
              preventdefault:submit
              onSubmit$={(e: any | FormData | SubmitEvent = {}) => {
                const target = e.target;
                search.value = target.elements.search.value;
              }}
            >
              <label class="block space-y-2 flex-1 max-w-sm sm:mr-6 w-full">
                <input
                  required
                  type="text"
                  name="search"
                  placeholder="Discover nearby activities and events"
                  class="w-full px-3 py-2 text-sm border border-opacity-30 border-primary rounded"
                />
              </label>
              <button
                type="submit"
                class="w-full sm:w-auto mt-4 sm:mt-0 max-w-sm py-2 px-8 text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
              >
                Search
              </button>
            </form>
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {data?.map((event: Event) => (
                <div class="mt-16" key={event.place_id}>
                  <EventCard
                    event={event}
                    baseUrl={baseUrl.value.baseUrl as string}
                  />
                </div>
              ))}
            </div>
          </div>
        ): (
          <div class="flex justify-center items-center">
            <NotFoundIcon />
          </div>
        );
      }}
    />
  );
});

export const head: DocumentHead = {
  title: "Fugit - Explore the Possibilities",
  meta: [
    {
      name: "description",
      content:
        "Discover new experiences and connect with like-minded individuals on Fugit! Our AI-powered platform offers personalized recommendations and social planning tools to help you find your next adventure. Browse user-generated content, join groups, and create your own plans today!",
    },
    {
      name: "keywords",
      content:
        "Fugit, explore, experiences, recommendations, social planning, groups",
    },
  ],
};
