import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Event } from "~/types";
import { getTimeDifference } from "~/utils/string";
// import { BookmarkedIcon, BookmarkIcon } from "../icons/socials";

interface Props {
  baseUrl: string;
  action?: any;
  isPublished?: boolean;
  own?: boolean;
  event: Event;
}

export default component$(({ event, baseUrl, isPublished, own }: Props) => {
  const url = `${isPublished ? "" : "/preview"}/${event?.slug}/p/${event?.id}`;
  return (
    <div class="flex flex-col h-full rounded overflow-hidden border border-opacity-30 border-primary rounded-lg p-4">
      <div class="flex justify-between">
        <h3 class="font-semibold text-secondary">{event.name}</h3>
        {/* <button>
          {event.bookedmarked ? (
            <BookmarkedIcon styles="fill-primary" />
          ) : (
            <BookmarkIcon styles="fill-primary" />
          )}
        </button> */}
        {own && (
          <div class="flex items-center">
            <span
              class={`text-sm font-medium mr-1 ${
                isPublished ? "text-primary" : "text-quinary"
              }`}
            >
              {isPublished ? "Live" : "Draft"}
            </span>
            <div
              class={`rounded-full h-3 w-3 ${
                isPublished ? "bg-primary" : "bg-quinary"
              }`}
            ></div>
          </div>
        )}
      </div>
      <p class="text-xs mt-4 flex-1">{event.formatted_address}</p>
      <div class="flex-shrink-0 w-full h-64 mt-4">
        <img
          src={`${baseUrl}/photos/${event.photos}`}
          alt={event.name}
          class="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div class="flex justify-between items-center mt-8">
        <div>
          <div>
            <span class="text-sm">{event?.booked_seats}</span>
            <span class="text-sm text-gray-600">
              /{event?.total_seats} booked
            </span>
          </div>
          <div>
            <span class="text-sm text-gray-600">
              {getTimeDifference(event?.end_date as string)}
            </span>
          </div>
        </div>
        <Link
          href={url}
          class="py-1 px-4 text-primary hover:text-white bg-transparent border border-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
        >
          Explore
        </Link>
      </div>
    </div>
  );
});
