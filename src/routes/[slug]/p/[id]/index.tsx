import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, zod$, z } from "@builder.io/qwik-city";
import { Form } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Chat from "~/components/chat/chat";
import EventDate from "~/components/event-date/event-date";
import EventOwnerActions from "~/components/event-owner-actions/event-owner-actions";
import EventRequestActions from "~/components/event-request-actions/event-request-actions";
import { Ghost } from "~/components/icons/ghost";
import { decodeAccessToken } from "~/utils/auth";
import { callApi, getAccessTokenFromCookie } from "~/utils/fetch";
import { getGoogleMapsUrl } from "~/utils/place";

export const usePreviewDataLoader = routeLoader$(
  async ({ env, params, redirect }) => {
    const baseUrl = env.get("VITE_API_URL") as string;
    const result: any = await callApi(
      {
        endpoint: `/events/${params?.id}`,
        method: "GET",
      },
      baseUrl
    );

    if (result?.event?.slug !== params.slug) {
      throw redirect(302, `/${result?.event?.slug}/p/${params?.id}`);
    }

    return result;
  }
);

export const useRequestAction = routeAction$(
  async (data, { fail, env, params, cookie }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      const result: any = await callApi(
        {
          endpoint: `/events/${params?.id}/requests`,
          method: "POST",
        },
        baseUrl,
        cookie
      );

      if (result) {
        return result;
      }

      return fail(403, {
        message: "Unexpected error, please retry!",
      });
    } catch (e: any) {
      return fail(403, {
        message: e.message,
      });
    }
  }
);

export const useRequestStatusAction = routeAction$(
  async (data, { fail, env, params, cookie }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      const result: any = await callApi(
        {
          endpoint: `/events/${params?.id}/requests`,
          method: "PATCH",
          body: data,
        },
        baseUrl,
        cookie
      );

      if (result) {
        return result;
      }

      return fail(403, {
        message: "Unexpected error, please retry!",
      });
    } catch (e: any) {
      return fail(403, {
        message: e.message,
      });
    }
  },
  zod$({
    user_id: z.string(),
    status: z.string(),
  })
);

export const useRequestDetails = routeLoader$(
  async ({ env, cookie, params }) => {
    try {
      const authState = getAccessTokenFromCookie(cookie);
      const baseUrl = env.get("VITE_API_URL") as string;
      if (authState?.access_token) {
        const result: any = await callApi(
          {
            endpoint: `/accounts/user/events/request/${params?.id}`,
            method: "GET",
          },
          baseUrl,
          cookie
        );

        if (!result?.message) {
          return result;
        }
        return null;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
);

export const useOwnerRequestDetails = routeLoader$(
  async ({ env, cookie, params }) => {
    try {
      const authState = getAccessTokenFromCookie(cookie);
      const baseUrl = env.get("VITE_API_URL") as string;
      if (authState?.access_token) {
        const result: any = await callApi(
          {
            endpoint: `/events/${params?.id}/requests`,
            method: "GET",
          },
          baseUrl,
          cookie
        );
        return result?.data;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
);

export const useAppDetails = routeLoader$(({ env, cookie }) => {
  const baseUrl = env.get("VITE_API_URL");
  const baseWssUrl = env.get("VITE_WSS_URL");
  const authState = getAccessTokenFromCookie(cookie);
  if (authState?.access_token) {
    const decodedToken = decodeAccessToken(authState?.access_token);
    return {
      baseUrl,
      baseWssUrl,
      loggedInUserId: decodedToken?.user_id,
      name: decodedToken?.name,
      token: authState?.access_token,
    };
  }
  return {
    baseUrl,
  };
});

export default component$(() => {
  const previewData = usePreviewDataLoader();
  const appDetails = useAppDetails();
  const eventRequestPost = useRequestAction();
  const eventRequest = useRequestDetails();
  const ownerResquests = useOwnerRequestDetails();
  const changeStatus = useRequestStatusAction();

  const { event = {}, owner = {} } = previewData?.value || {};

  const {
    name,
    description,
    photos,
    start_date,
    end_date,
    total_seats,
    booked_seats = 0,
    formatted_address,
    location_name,
    place_id,
  } = event as any;

  const { name: hostOwner, avatarUrl, id: ownerId } = owner;
  const {
    baseUrl,
    loggedInUserId,
    baseWssUrl,
    name: userName,
    token,
  } = appDetails.value || {};

  const isOwner = loggedInUserId === ownerId;
  const showChat: boolean =
    isOwner || eventRequest.value?.status === "accepted";

  return (
    <div class="mx-auto max-w-7xl lg:px-8 sm:px-8 mt-24 md:mt-8 mb-32 container mx-auto">
      <div class="flex flex-wrap gap-x-10 justify-start 4xl:justify-around">
        <div class="max-w-xl mb-8">
          <h1 class="text-xl font-semibold text-text mb-4">{name}</h1>
          <h2 class="text-sm font-normal mb-6 text-quinary">{description}</h2>
          <EventDate
            startDate={new Date(start_date)}
            endDate={new Date(end_date)}
            eventInfo={{
              entries: total_seats,
              left: booked_seats,
            }}
          />
          <div class="mt-8">
            <h2 class="text-md font-semibold text-text">Location</h2>
            <div class="text-sm mt-3">{location_name}</div>
            <div class="text-xs mt-1">{formatted_address}</div>
            <a
              href={getGoogleMapsUrl(formatted_address, place_id)}
              target="_blank"
              rel="noreferrer"
              class="text-sm text-primary hover:bg-opacity-75 space-x-2 mt-2"
            >
              view on map
            </a>
          </div>
          <div class="my-8">
            <h2 class="text-md font-semibold text-text mt-8">Host Details</h2>
            <div class="flex items-center mt-3">
              {avatarUrl ? (
                <img
                  class="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-4"
                  src={avatarUrl}
                  alt={hostOwner}
                />
              ) : (
                <Ghost styles="fill-primary mr-4" />
              )}
              <span class="text-sm">{hostOwner}</span>
            </div>
          </div>
          <div class="flex justify-between max-w-sm mb-8">
            {isOwner && (
              <EventOwnerActions
                action={ownerResquests}
                statusAction={changeStatus}
              />
            )}
            {loggedInUserId && !showChat && (
              <Form action={eventRequestPost}>
                <EventRequestActions action={eventRequest} />
              </Form>
            )}
            {!loggedInUserId && (
              <Link
                href="/login"
                class="py-2 px-8 text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
              >
                Login to Join
              </Link>
            )}
          </div>
          {showChat && (
            <div class="flex-shrink-0 h-auto max-w-md">
              <img
                src={`${baseUrl}/photos/${photos}`}
                alt={name}
                class="h-full w-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div class="flex-shrink-0 h-auto max-w-md">
          <img
            src={`${baseUrl}/photos/${photos}`}
            alt={name}
            class={`h-full w-full object-cover rounded-lg ${
              !showChat ? "block" : "hidden"
            }`}
          />
          <div class={showChat ? "block" : "hidden"}>
            {baseWssUrl && (
              <Chat baseWssUrl="ws://127.0.0.1:8787/api/v1" name={userName} token={token} />
            )}
          </div>
        </div>
      </div>
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
