import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ json }) => {
  json(200, {
    applinks: {
      details: [
        {
          components: [{ "/": "/*" }],
          appIDs: ["F5SZLQKVH8.io.higgle.fugitapp"],
        },
      ],
    },
  });
};
