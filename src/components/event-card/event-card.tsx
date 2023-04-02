import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Event } from "~/types";
import { BookmarkedIcon, BookmarkIcon } from "../icons/socials";

interface Props {
  baseUrl: string;
  action?: any;
  event: Event;
}

export default component$(({ event, baseUrl }: Props) => {
  return (
    <div class="rounded overflow-hidden border border-opacity-30 border-primary rounded-lg p-4">
      <div class="flex justify-between">
        <h3 class="font-semibold text-secondary">{event.name}</h3>
        {/* <button>
          {event.bookedmarked ? (
            <BookmarkedIcon styles="fill-primary" />
          ) : (
            <BookmarkIcon styles="fill-primary" />
          )}
        </button> */}
      </div>
      <p class="text-xs mt-4">{event.formatted_address}</p>
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
            <span class="text-sm text-gray-600">Closing soon!</span>
          </div>
        </div>
        <Link
          href={`/${event?.slug}/p/${event?.id}`}
          class="py-1 px-4 text-primary hover:text-white bg-transparent border border-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
        >
          Explore
        </Link>
      </div>
    </div>
  );
});
