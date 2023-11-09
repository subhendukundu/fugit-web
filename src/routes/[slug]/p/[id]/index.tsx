import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
// import { Link } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import EventDetails from "~/components/event-details/event-details";
import { socialTags } from "~/config/social-tags";
import { imageBaseUrl } from "~/config/vars";
import type { EventData } from "~/types";
import { toUrlFriendly } from "~/utils/string";
import { tursoClient } from "~/utils/turso";

export const usePreviewDataLoader = routeLoader$(async (req) => {
  const { params, redirect } = req;
  const db = tursoClient(req);
  const eventResponse = await db.execute({
        sql: `SELECT 
        e.title AS title,
        e.description AS description,
        e.featured_photo AS featured_photo,
        e.start_date AS start_date,
        e.end_date AS end_date,
        e.max_seat AS max_seat,
        e.booked_seats AS booked_seats,
        e.area AS area,
        e.place_id AS place_id,
        u.profile_photo AS owner_profile_photo,
        u.name AS owner_name,
        COUNT(CASE WHEN jr.status = 'ACCEPTED' THEN 1 ELSE NULL END) AS booked_seats
      FROM event e
      INNER JOIN user u ON e.created_by = u.user_id
      LEFT JOIN join_request jr ON e.event_id = jr.event_id
      WHERE e.event_id = ?
      GROUP BY e.event_id;
    `,
    args: [params.id],
  });

  const result = eventResponse.rows;

  if (!result.length) {
    throw redirect(302, `/404`);
  }
  const event = result[0] as unknown as EventData;

  const slug = toUrlFriendly(event.title);

  if (slug !== params.slug) {
    throw redirect(302, `/${slug}/p/${params.id}`);
  }

  return event;
});

export default component$(() => {
  const previewData = usePreviewDataLoader();

  const event = previewData.value;

  const {
    title,
    description,
    featured_photo: photo,
    start_date,
    end_date,
    max_seat,
    booked_seats = 0,
    area,
    place_id,
    owner_name,
    owner_profile_photo,
  } = event;

  return (
    <div class="mx-auto max-w-7xl lg:px-8 sm:px-8 mt-24 md:mt-8 mb-32 container mx-auto">
      <div class="flex flex-wrap gap-x-10 justify-around">
        <div class="max-w-xl mb-8">
          <EventDetails
            name={title}
            description={description}
            startDate={start_date}
            endDate={end_date}
            locationName={area}
            placeId={place_id}
            avatarUrl={owner_profile_photo}
            hostOwner={owner_name}
            totalSeats={max_seat}
            bookedSeats={booked_seats}
          />

          {/* <div class="mb-8 flex max-w-sm justify-between">
            <Link
              href="/login"
              class="bg-primary hover:bg-primary-light focus:ring-primary-dark px-8 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Download to Join
            </Link>
          </div> */}
        </div>
        <div class="h-auto max-w-md flex-shrink-0">
          <img
            decoding="async"
            loading="lazy"
            srcSet={`${imageBaseUrl}/${photo} 200w, ${imageBaseUrl}/${photo} 400w`}
            alt={title}
            class={`h-full w-full rounded-lg object-cover`}
            width="400"
            height="600"
          />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const previewData = resolveValue(usePreviewDataLoader);
  return {
    title: `Event Details | ${previewData.title}`,
    meta: [
      {
        name: "description",
        content: previewData.description,
      },
      ...socialTags,
    ],
  };
};
