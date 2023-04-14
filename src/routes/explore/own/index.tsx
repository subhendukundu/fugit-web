import {
  component$,
  Resource,
} from "@builder.io/qwik";
import type { DocumentHead} from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import EventCard from "~/components/event-card/event-card";
import { NotFoundIcon } from "~/components/icons/not-found";
import Loader from "~/components/loader/loader";
import { socialTags } from "~/config/social-tags";
import type { Event } from "~/types";
import { callApi } from "~/utils/fetch";

export const useBaseUrl = routeLoader$(({ env }) => {
  const baseUrl = env.get("VITE_API_URL");
  return {
    baseUrl,
  };
});

export const useOwnEventDetails = routeLoader$(async ({ env, cookie }) => {
  try {
    const baseUrl = env.get("VITE_API_URL") as string;
    const result: any = await callApi(
      {
        endpoint: `/accounts/user/events`,
        method: "GET",
      },
      baseUrl,
      cookie
    );
    console.log("result", result);
    return result?.data || [];
  } catch (e) {
    console.log(e);
    return null;
  }
});

export default component$(() => {
  const baseUrl = useBaseUrl();
  const ownEvents = useOwnEventDetails();

  return (
    <Resource
      value={ownEvents}
      onPending={() => <Loader />}
      onRejected={() => <div>Failed to fetch Events</div>}
      onResolved={(data: any) => {
        console.log("data", data);
        return data?.length ? (
          <div class="flex-1 mt-20 mb-20">
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {data?.map((event: Event) => (
                <div class="mt-16" key={event.place_id}>
                  <EventCard
                    event={event}
                    baseUrl={baseUrl.value.baseUrl as string}
                    own
                    isPublished={!event?.is_draft}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div class="flex flex-col sm:flex-row justify-center items-center">
            <div class="mr-32">
              <h2 class="text-md font-semibold text-text mb-8">
                Join our community and create your first event today!
              </h2>
              <Link
                href="/"
                class="py-2 px-8 bg-transparent border border-primary text-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
              >
                Create
              </Link>
            </div>
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
    ...socialTags,
  ],
};
