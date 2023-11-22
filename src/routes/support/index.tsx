import { component$ } from "@builder.io/qwik";
import {
  Form,
  type DocumentHead,
  routeAction$,
  zod$,
  z,
} from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import { socialTags } from "~/config/social-tags";
import { addSupportRequest } from "~/utils/user";

export const useSendSupportRequestAction = routeAction$(
  async (data, req) => {
    const { fail } = req;
    try {
      const { email, subject, message } = data;
      const result = await addSupportRequest(req, email, subject, message);
      if (result instanceof Error) {
        return fail(403, {
          message: result.message,
        });
      }
      return {
        done: true,
      };
    } catch (e) {
      return fail(403, {
        message: "Something went wrong, try again later.",
      });
    }
  },
  zod$({
    email: z.string(),
    subject: z.string(),
    message: z.string(),
  }),
);

export default component$(() => {
  const sendSupportRequest = useSendSupportRequestAction();
  return (
    <section class="bg-white">
      <div class="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
        <h2 class="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900">
          Contact Us
        </h2>
        {sendSupportRequest.value ? (
          <>
            <p class="mb-4 text-gray-600">
              Your request has been received. Please wait while we process your
              request.
            </p>
          </>
        ) : (
          <>
            <p class="mb-8 text-center font-light text-gray-500 sm:text-xl lg:mb-16">
              Got a technical issue? Want to send feedback about a beta feature?
              Need details about our Business plan? Let us know.
            </p>
            <Form spaReset class="space-y-8" action={sendSupportRequest}>
              <div>
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
                  placeholder="name@fugit.app"
                  required
                  name="email"
                />
              </div>
              <div>
                <label
                  for="subject"
                  class="mb-2 block text-sm font-medium text-gray-900"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm"
                  placeholder="Let us know how we can help you"
                  required
                  name="subject"
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="message"
                  class="mb-2 block text-sm font-medium text-gray-900"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
                  placeholder="Leave a comment..."
                  name="message"
                ></textarea>
              </div>
              <Button
                onClick$={async () => {}}
                label="Send message"
                isRunning={false}
                type="submit"
              />
            </Form>
          </>
        )}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Fugit Support",
  meta: [
    {
      name: "description",
      content:
        "Get help and support for Fugit app. Find answers to common questions and troubleshooting tips.",
    },
    {
      name: "keywords",
      content:
        "Fugit, Support, help, troubleshooting, customer service, app assistance",
    },
    ...socialTags,
  ],
};
