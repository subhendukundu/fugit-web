import type { RequestHandler } from "@builder.io/qwik-city";
import type { EventData } from "~/types";
import { toUrlFriendly } from "~/utils/string";
import { tursoClient } from "~/utils/turso";

export const onGet: RequestHandler = async (req) => {
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

  throw redirect(302, `/${slug}/p/${params.id}`);
};
