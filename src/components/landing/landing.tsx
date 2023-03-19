import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { Loader1 as HeroImage } from "~/components/icons/loader";

type Props = {
  action?: any;
};

export default component$(({ action }: Props) => {
  return (
    <div class="flex flex-1 flex-col lg:flex-row">
      <Form
        action={action}
        class="flex-1 lg:max-w-lg lg:mx-auto mt-16"
      >
        <h1 class="text-3xl font-medium text-secondary">
          Same Quirks, New Friends!
        </h1>
        <p class="text-base text-secondary mt-6">
          Time flies when you are having fun, be it checking out a cool new cafe
          or signing up for a brewery tour. But how many times have you skipped
          having that delicious Biryani or going to a game simply because you
          were alone? Next time you want company, just Fugit! Our AI-powered app
          will match you with a potential friend or even a bunch of people with
          the same interests to join you! All you have to do is announce it on
          Fugit and get the plan going!
        </p>
        <div class="flex items-center mt-8">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search"
              class="border border-opacity-30 border-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search"
              required
              name="search"
            />
          </div>
        </div>
        <div class="flex items-center space-x-4 mt-8">
          <button
            type="submit"
            class="py-2 px-8 text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
          >
            Search
          </button>
          <Link
            href="/explore"
            class="py-2 px-8 bg-transparent border border-primary text-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
          >
            Explore
          </Link>
        </div>
      </Form>
      <div class="flex-1 lg:max-w-lg lg:mx-auto">
        <HeroImage />
      </div>
    </div>
  );
});
