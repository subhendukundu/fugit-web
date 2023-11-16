import { component$, useStore } from "@builder.io/qwik";
import {
  Form,
  type DocumentHead,
  routeAction$,
  zod$,
  z,
} from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import { socialTags } from "~/config/social-tags";
import { confirm, verify } from "~/utils/auth";
import { addDeleteRequest } from "~/utils/user";

export const useSendOtpAction = routeAction$(
  async (data, { cookie, fail, env }) => {
    try {
      const baseUrl = env.get("VITE_API_URL") as string;

      const result = await verify(data, cookie, baseUrl);
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
    phone: z.string().length(10),
  }),
);

export const useConfirmOtpAction = routeAction$(
  async (data, req) => {
    const { cookie, fail, env } = req;
    try {
      const baseUrl = env.get("VITE_API_URL") as string;
      const result = await confirm(data, cookie, baseUrl);
      if (result instanceof Error) {
        return fail(403, {
          message: result.message,
        });
      }
      await addDeleteRequest(req, result);
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
    phone: z.string().length(10),
    code: z.string().length(6),
  }),
);

export default component$(() => {
  const sendOtp = useSendOtpAction();
  const confirmOtp = useConfirmOtpAction();
  const store = useStore({
    phone: "",
    code: "",
    accepted: false,
  });
  return (
    <>
      <div class="mt-16 flex flex-col items-center">
        <div class="flex w-96 flex-col">
          <h2 class="mb-6 text-center text-2xl font-bold text-secondary">
            Delete Data Request
          </h2>
          {confirmOtp.value ? (
            <>
              <p class="mb-4 text-gray-600">
                Your request to delete data associated with phone number{" "}
                +91{store.phone} has been received. Please wait while we process
                your request.
              </p>
            </>
          ) : (
            <>
              <p class="mb-4 text-gray-600">
                {sendOtp.value?.done
                  ? `Please confirm your request to delete your data. Once confirmed,
                  this action cannot be undone.`
                  : `Please confirm your phone number to request data deletion. This is important
                  to ensure the security of your account. Once confirmed, this action cannot be undone.`}
              </p>
              <div class="mb-4">
                <label
                  for="hs-inline-add-on"
                  class="mb-2 block text-sm font-medium dark:text-white"
                >
                  Website URL
                </label>
                <div class="relative border">
                  <input
                    type="text"
                    name="hs-inline-add-on"
                    class="block w-full rounded px-4 py-3 ps-16 text-sm shadow-sm focus:z-10 disabled:pointer-events-none disabled:opacity-50"
                    placeholder="Phone Number"
                    required
                    onChange$={(e) => {
                      store.phone = e.target.value;
                    }}
                    value={store.phone}
                    minLength={10}
                    maxLength={10}
                  />
                  <div class="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
                    <span class="text-sm text-gray-500">+91</span>
                  </div>
                </div>
              </div>
              {sendOtp.value?.done && (
                <>
                  <input
                    type="text"
                    class="mb-4 w-full rounded border p-2"
                    placeholder="OTP"
                    required
                    maxLength={6}
                    minLength={6}
                    onChange$={(e) => {
                      store.code = e.target.value;
                    }}
                    name="code"
                  />
                  <div class="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="confirmDelete"
                      name="confirmDelete"
                      onChange$={() => !store.accepted}
                    />
                    <label for="confirmDelete" class="ml-2">
                      I confirm to delete my data
                    </label>
                  </div>
                </>
              )}
              {sendOtp.value?.failed && (
                <div class="mb-4">
                  <p class="text-xs italic text-red-500">
                    {sendOtp.value.message}
                  </p>
                </div>
              )}
              <Button
                onClick$={async () => {
                  store.code
                    ? await confirmOtp.submit({
                        phone: store.phone,
                        code: store.code,
                      })
                    : await sendOtp.submit({ phone: store.phone });
                }}
                label="Confirm Delete"
                isRunning={
                  store.code ? confirmOtp.isRunning : sendOtp.isRunning
                }
                type="button"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Delete Data Request",
  meta: [
    {
      name: "description",
      content:
        "This is the delete data request page. By using this page, you can request to delete your data.",
    },
    {
      name: "keywords",
      content: "Delete Data, user agreement, app usage, legal, policy",
    },
    ...socialTags,
  ],
};
