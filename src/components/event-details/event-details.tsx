import { component$ } from "@builder.io/qwik";
import EventDate from "../event-date/event-date";
import { Ghost } from "../icons/ghost";
import { imageBaseUrl } from "~/config/vars";

interface Props {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  totalSeats: number;
  bookedSeats: number;
  locationName?: string;
  formattedAddress?: string;
  placeId?: string;
  avatarUrl?: string;
  hostOwner: string;
  searching?: boolean;
}

export default component$((props: Props) => {
  const {
    name,
    description,
    startDate,
    endDate,
    totalSeats,
    bookedSeats,
    locationName,
    avatarUrl,
    hostOwner,
    searching,
  } = props;
  return (
    <>
      <h1 class="text-xl font-semibold text-text mb-4">{name}</h1>
      <h2 class="text-sm font-normal mb-6 text-quinary">{description}</h2>
      <EventDate
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        eventInfo={{
          entries: totalSeats,
          left: bookedSeats,
        }}
      />
      {!searching && (
        <div class="mt-8">
          <h2 class="text-md font-semibold text-text">Location</h2>
          <div class="text-sm mt-3">{locationName}</div>
        </div>
      )}
      <div class="my-8">
        <h2 class="text-md font-semibold text-text mt-8">Host Details</h2>
        <div class="flex items-center mt-3">
          {avatarUrl ? (
            <img
              class="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-4"
              src={`${imageBaseUrl}/${avatarUrl}`}
              alt={hostOwner}
              height="40"
              width="40"
            />
          ) : (
            <Ghost styles="fill-primary mr-4" />
          )}
          <span class="text-sm">{hostOwner}</span>
        </div>
      </div>
    </>
  );
});
