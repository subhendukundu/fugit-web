import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async (requestEvent) => {
  requestEvent.headers.set('Access-Control-Allow-Origin', '*');
  requestEvent.headers.set("Content-Type", "application/json");
  requestEvent.send(
    200,
    JSON.stringify({
      applinks: {
        details: [
          {
            components: [{ "/": "/*" }],
            appIDs: ["F5SZLQKVH8.io.higgle.fugitapp"],
          },
        ],
      },
    })
  );
};
