import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { zod$, z, globalAction$, routeLoader$ } from "@builder.io/qwik-city";
import Landing from "~/components/landing/landing";
import SearchResults from "~/components/search-results/search-results";
import { callApi } from "~/utils/fetch";

export const useSearchAction = globalAction$(
  async (data, { fail, env }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      console.log(baseUrl);
      const result: any = await callApi(
        {
          endpoint: `/search?q=${data.search}`,
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

export const useEventAction = globalAction$(
  async (data, { fail, env }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      console.log(baseUrl);
      /* const result: any = await callApi(
        {
          endpoint: `/search?q=${data.search}`,
          method: "GET",
        },
        baseUrl
      ); */
      const result = {};
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

export const useBaseUrl = routeLoader$(({ env }) => {
  const baseUrl = env.get("VITE_API_URL");
  return {
    baseUrl,
  };
});

export default component$(() => {
  const search = useSearchAction();
  const baseUrl = useBaseUrl();
  // const event = useCreateEventAction();

  return (
    <>
      {search.value ? (
        search.value?.failed ? (
          <div class="bg-red-500 text-white p-2 mt-2">
            Error: {search.value.failed}
          </div>
        ) : (
          <SearchResults
            baseUrl={baseUrl.value.baseUrl as string}
            // action={event}
            results={search?.value?.results}
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
  ],
};
