import { component$, useSignal } from "@builder.io/qwik";
import type { IdeaWithPlaces, IdeaWithPlace } from "~/types";
import { showNotification } from "~/utils/notification";
import { toUrlFriendly } from "~/utils/string";
import Button from "../button/button";
import Tree from "../tree/tree";
import EventDetails from "../event-details/event-details";

interface Props {
  baseUrl: string;
  action?: any;
  results: IdeaWithPlaces[];
  loggedIn: boolean;
  title: string;
}

export default component$(
  ({ baseUrl, action, results, loggedIn, title }: Props) => {
    const selectedEvent = useSignal<IdeaWithPlace>({
      idea: results?.[0]?.idea,
      place: results?.[0]?.places?.[0],
    });

    const eventData = {
      name: selectedEvent.value?.idea?.activity_name,
      description: selectedEvent.value?.idea?.short_description,
      area_name: selectedEvent.value?.idea?.location,
      location_name: selectedEvent?.value?.place?.name,
      formatted_address: selectedEvent?.value?.place?.formatted_address,
      place_id: selectedEvent?.value?.place?.place_id,
      rating: selectedEvent?.value?.place?.rating,
      user_ratings_total: selectedEvent?.value?.place?.user_ratings_total,
      photos: selectedEvent?.value?.place?.photos,
      geometry: selectedEvent?.value?.place?.geometry?.location,
      slug: toUrlFriendly(
        `${selectedEvent.value?.idea?.activity_name} ${selectedEvent.value?.idea?.location}`
      ),
    };

    return (
      <div class="mt-20 mb-20">
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
              selectedEvent={selectedEvent}
            />
          </div>
          <div class="flex-1 max-w-xl mb-8">
            <EventDetails
              key={eventData.name}
              name={eventData.name}
              description={eventData.description}
              startDate={new Date().toISOString().slice(0, 10)}
              endDate={new Date().toISOString().slice(0, 10)}
              locationName={eventData?.location_name}
              formattedAddress={eventData?.formatted_address}
              placeId={eventData?.place_id}
              hostOwner="User Name"
              totalSeats={2}
              bookedSeats={0}
            />
          </div>
          {selectedEvent?.value?.place?.place_id && (
            <div class="fixed bottom-10 right-14 z-1">
              <Button
                isRunning={action.isRunning}
                type="button"
                styles="flex items-center py-2 px-8 text-white font-medium bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                onClick$={async () => {
                  if (loggedIn) {
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
