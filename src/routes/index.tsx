import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { socialTags } from "~/config/social-tags";

export default component$(() => {
  return (
    <>
      <h1>fugit</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Fugit - Find Your Tribe, Join the Fun",
  meta: [
    {
      name: "description",
      content:
        "Ready for your next big adventure? Fugit is the app that helps you make it happen! Our AI-powered platform connects you with like-minded individuals who share your passion for exploring new places and trying new things. From hiking trails to hidden cafes, Fugit's personalized recommendations and social planning tools make it easy to create unforgettable memories.",
    },
    {
      name: "keywords",
      content:
        "Fugit, social app, find like-minded people, AI-powered platform, personalized recommendations, social planning tools, exploring new places, trying new things, unforgettable memories",
    },
    ...socialTags,
  ],
};