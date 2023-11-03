import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ json, headers }) => {
  headers.set("Content-Type", "application/json");
  json(200, {
    applinks: {
      apps: ["F5SZLQKVH8.io.higgle.fugitapp"],
      details: {
        appIDs: ["F5SZLQKVH8.io.higgle.fugitapp"],
        appID: "F5SZLQKVH8.io.higgle.fugitapp",
        paths: ["*"],
      },
    },
    webcredentials: {
      apps: ["F5SZLQKVH8.io.higgle.fugitapp"],
    },
  });
};
