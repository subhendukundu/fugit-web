import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ json }) => {
  json(200, {
    applinks: {
      details: [
        {
          appID: "F5SZLQKVH8.io.higgle.fugitapp",
          paths: ["*"],
        },
      ],
    },
  });
};
