import { component$ } from "@builder.io/qwik";
import { Loader1 as HeroImage } from "~/components/icons/loader";

export default component$(() => {
  return (
    <div class="flex flex-1 flex-col lg:flex-row">
      <div class="mt-16 flex-1 lg:mx-auto lg:max-w-lg">
        <h1 class="text-secondary text-3xl font-medium">
          Same Quirks, New Friends!
        </h1>
        <p class="text-secondary mt-6 text-base">
          Time flies when you are having fun, be it checking out a cool new cafe
          or signing up for a brewery tour. But how many times have you skipped
          having that delicious Biryani or going to a game simply because you
          were alone? Next time you want company, just Fugit! Our AI-powered app
          will match you with a potential friend or even a bunch of people with
          the same interests to join you! All you have to do is announce it on
          Fugit and get the plan going!
        </p>
      </div>
      <div class="flex-1 lg:mx-auto lg:max-w-lg">
        <HeroImage />
      </div>
    </div>
  );
});
