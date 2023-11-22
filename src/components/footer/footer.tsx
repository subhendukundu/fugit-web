import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <footer class="m-4">
      <div class="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © {new Date().getFullYear()}
          <a href="/" class="ml-1 hover:underline">
            fugit™
          </a>
          . All Rights Reserved.
        </span>
        <ul class="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/" class="mr-4 hover:underline md:mr-6 ">
              Home
            </a>
          </li>
          <li>
            <a href="/terms-and-condition" class="mr-4 hover:underline md:mr-6">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a href="/privacy-policy" class="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/delete-data-request" class="mr-4 hover:underline md:mr-6">
              Delete Data Request
            </a>
          </li>
          <li>
            <a href="/support" class="mr-4 hover:underline md:mr-6">
              Support
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
});
