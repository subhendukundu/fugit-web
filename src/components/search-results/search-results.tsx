import { component$, useSignal } from "@builder.io/qwik";
import type { IdeaWithPlaces, IdeaWithPlace } from "~/types";
import { showNotification } from "~/utils/notification";
import { toUrlFriendly } from "~/utils/string";
import Button from "../button";
import StarRating from "../star-rating/star-rating";

interface Props {
  baseUrl: string;
  action?: any;
  results: IdeaWithPlaces[];
  loggedIn: boolean;
}

export default component$(({ baseUrl, action, results, loggedIn }: Props) => {
  const selectedEvent = useSignal<IdeaWithPlace>();
  return (
    <div class="flex-1 mt-20 mb-20">
      <div>
        {results.map(({ idea, places }) => (
          <div class="mt-16" key={idea.activity_name}>
            <h2 class="text-xl font-semibold mb-4 text-secondary">
              {idea.activity_name}
            </h2>
            <p class="text-sm font-normal mb-6">{idea.short_description}</p>
            <div class="flex gap-x-5 overflow-x-scroll pt-4">
              {places.map((place) => (
                <label
                  class="flex items-center h-full cursor-pointer"
                  key={place.place_id}
                >
                  <input
                    type="radio"
                    name="place"
                    value={place.place_id}
                    class="peer sr-only"
                    onChange$={() => {
                      selectedEvent.value = {
                        idea,
                        place,
                      };
                    }}
                  />
                  <div class="peer-checked:border-primary border-2 rounded-lg p-4 flex flex-col justify-between h-full">
                    <div class="flex">
                      <div class="flex-shrink-0 h-32 w-32 mr-4">
                        <img
                          src={`${baseUrl}/photos/${place.photos}`}
                          alt={place.name}
                          class="h-full w-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h4 class="text-base font-medium mb-2 text-secondary truncate w-36">
                          {place.name}
                        </h4>
                        <StarRating rating={place.rating} />
                        <div class="flex items-center mt-4">
                          <span class="text-primary">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 384 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                            </svg>
                          </span>
                          <a
                            href={place.location_link}
                            target="_blank"
                            rel="noreferrer"
                            class="text-sm hover:bg-opacity-75 space-x-2 ml-2"
                          >
                            view on map
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedEvent?.value?.place?.place_id && (
        <div class="fixed bottom-10 right-14 z-1">
          <Button
            isRunning={action.isRunning}
            type="button"
            styles="flex items-center py-2 px-8 text-white font-medium bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
            onClick$={async () => {
              if (loggedIn) {
                await action.submit({
                  name: selectedEvent.value?.idea?.activity_name,
                  description: selectedEvent.value?.idea?.short_description,
                  area_name: selectedEvent.value?.idea?.location,
                  location_name: selectedEvent?.value?.place?.name,
                  formatted_address:
                    selectedEvent?.value?.place?.formatted_address,
                  place_id: selectedEvent?.value?.place?.place_id,
                  rating: selectedEvent?.value?.place?.rating,
                  user_ratings_total:
                    selectedEvent?.value?.place?.user_ratings_total,
                  photos: selectedEvent?.value?.place?.photos,
                  geometry: selectedEvent?.value?.place?.geometry?.location,
                  slug: toUrlFriendly(
                    `${selectedEvent.value?.idea?.activity_name} ${selectedEvent.value?.idea?.location}`
                  ),
                });
              } else {
                showNotification(
                  "You need to log in to share an event!",
                  "error"
                );
              }
            }}
          >
            <>
              <span class="pr-2">Share Event</span>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </>
          </Button>
        </div>
      )}
    </div>
  );
});
