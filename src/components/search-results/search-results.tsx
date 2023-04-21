import { component$, useSignal } from "@builder.io/qwik";
import type { IdeaWithPlaces, Idea, WeightedPlace } from "~/types";
import { showNotification } from "~/utils/notification";
import { toUrlFriendly } from "~/utils/string";
import Button from "../button/button";
import Tree from "../tree/tree";
import EventDetails from "../event-details/event-details";
import StarRating from "../star-rating/star-rating";

interface Props {
  baseUrl: string;
  action?: any;
  results: IdeaWithPlaces[];
  loggedIn: boolean;
  title: string;
}

export default component$(
  ({ baseUrl, action, results, loggedIn, title }: Props) => {
    const selectedIdea = useSignal<Idea>(results?.[0]?.idea);
    const selectedPlace = useSignal<WeightedPlace>();
    const placesForSelectedIdea = results.find(
      (item) => item?.idea?.activity_name === selectedIdea.value?.activity_name
    );

    const eventData = {
      name: selectedIdea.value?.activity_name,
      description: selectedIdea.value?.short_description,
      area_name: selectedIdea.value?.location,
      location_name: selectedPlace?.value?.name,
      formatted_address: selectedPlace?.value?.formatted_address,
      place_id: selectedPlace?.value?.place_id,
      rating: selectedPlace?.value?.rating,
      user_ratings_total: selectedPlace?.value?.user_ratings_total,
      photos: selectedPlace?.value?.photos,
      geometry: selectedPlace?.value?.geometry?.location,
      slug: toUrlFriendly(
        `${selectedIdea.value?.activity_name} ${selectedIdea.value?.location}`
      ),
    };

    return (
      <div class="mb-20">
        <div class="flex flex-col sm:flex-row flex-wrap gap-x-10 md:gap-x-20 justify-start 4xl:justify-around">
          <div class="flex-1 max-w-xl mb-8">
            <Tree
              more
              defaultOpen
              idea={{
                activity_name: title,
                short_description: "",
                location: "",
              }}
              level={0}
              results={results}
              baseUrl={baseUrl}
              selectedIdea={selectedIdea}
            />
          </div>
          <div class="flex-1 max-w-xl mb-8">
            <EventDetails
              key={eventData.name}
              name={eventData.name}
              description={eventData.description}
              startDate={new Date().toISOString().slice(0, 10)}
              endDate={new Date().toISOString().slice(0, 10)}
              hostOwner="Your Name"
              totalSeats={2}
              bookedSeats={0}
              searching
            />
            <h2 class="text-md font-semibold text-text mt-8 mb-4">
              Places to pick from
            </h2>
            {placesForSelectedIdea?.places?.map((place) => (
              <div class="flex items-center mb-4" key={place.place_id}>
                <input
                  id={place.place_id}
                  type="radio"
                  value={place.place_id}
                  name="place_id"
                  class="peer w-6 h-6 text-primary accent-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2 cursor-pointer"
                  onChange$={() => {
                    selectedPlace.value = place;
                  }}
                />
                <label
                  for={place.place_id}
                  class="ml-4 text-sm font-medium text-text cursor-pointer flex flex-1 peer-checked:border-primary border-2 rounded-lg p-4"
                >
                  <div class="mr-4 flex-1">
                    <span>{place.name}</span>
                    <p class="text-xs font-normal mb-2">
                      {place.formatted_address}
                    </p>
                    <StarRating rating={place.rating} />
                    <div class="mt-4">
                      <a
                        href={place.location_link}
                        target="_blank"
                        rel="noreferrer"
                        class="text-sm hover:bg-opacity-75 space-x-2"
                      >
                        view on map
                      </a>
                    </div>
                  </div>
                  <div class="flex-shrink-0 h-32 w-32 mr-4">
                    <img
                      src={`${baseUrl}/photos/${place.photos}`}
                      alt={place.name}
                      class="h-full w-full object-cover rounded-lg"
                    />
                  </div>
                </label>
              </div>
            ))}
          </div>
          {selectedIdea?.value?.activity_name && (
            <div class="fixed bottom-10 right-14 z-1">
              <Button
                isRunning={action.isRunning}
                type="button"
                styles="flex items-center py-2 px-8 text-white font-medium bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                onClick$={async () => {
                  if (loggedIn) {
                    console.log("selectedIdeaWithPlace", eventData);
                    await action.submit(eventData);
                  } else {
                    showNotification(
                      "You need to log in to share an event!",
                      "error"
                    );
                  }
                }}
              >
                <>
                  <span class="pr-2">Edit Event</span>
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
      </div>
    );
  }
);
