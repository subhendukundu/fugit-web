import { component$, Resource } from "@builder.io/qwik";
import { parseISO, formatDistanceToNow } from "date-fns";
import type { UserRequest } from "~/types";
import { Ghost } from "../icons/ghost";
import { showNotification } from "~/utils/notification";

interface Props {
  loader: any;
  statusAction: any;
}

export default component$(({ loader, statusAction }: Props) => {
  return (
    <Resource
      value={loader}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Failed to load event details</div>}
      onResolved={(request: UserRequest[] = []) => {
        return (
          <div class="w-full">
            <h2 class="text-md font-semibold text-text mt-8">
              Requests received
            </h2>
            <ul class="max-w-md mt-4">
              {request.length ? (
                request.map((item) => (
                  <li class="pb-3 sm:pb-4" key={item.id}>
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        {item.avatarUrl ? (
                          <img
                            class="w-8 h-8 rounded-full"
                            src="/docs/images/people/profile-picture-1.jpg"
                            alt="Neil image"
                          />
                        ) : (
                          <Ghost styles="stroke-primary mr-4" />
                        )}
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium truncate text-secondary">
                          {item.name}
                        </p>
                        <p class="text-sm truncate text-tertiary">
                          {formatDistanceToNow(
                            parseISO(item?.created_at as string),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                      {/* <div class="inline-flex gap-x-5 items-center">
                      <button class="flex items-center justify-center rounded-full w-8 h-8 bg-tertiary bg-opacity-30">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                      <button class="flex items-center justify-center rounded-full w-8 h-8 bg-quinary bg-opacity-30">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div> */}
                      <div class="relative">
                        <select
                          onChange$={(e) =>
                            statusAction.submit({
                              status: e.target.value,
                              user_id: item.id,
                            })
                          }
                          aria-label="Request status"
                          name="request"
                          class="appearance-none rounded-md border border-zinc-900/10 py-2 px-6 block w-full sm:text-sm"
                        >
                          <option
                            key="pending"
                            value="pending"
                            selected={item.status === "pending"}
                          >
                            Pending
                          </option>
                          <option
                            key="accepted"
                            value="accepted"
                            selected={item.status === "accepted"}
                          >
                            Accepted
                          </option>
                          <option
                            key="rejected"
                            value="rejected"
                            selected={item.status === "rejected"}
                          >
                            Rejected
                          </option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            class="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li class="pb-3 sm:pb-4">
                  <p class="text-sm font-medium truncate text-secondary">
                    No request so far!
                  </p>
                </li>
              )}
            </ul>
            <h2 class="text-md font-semibold text-text mt-8">Cancel Event</h2>
            <button
              type="submit"
              class="mt-8 py-2 px-8 text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
              onClick$={async () => {
                showNotification(
                  "Cancelling events not available at the moment!",
                  "error"
                );
              }}
            >
              Cancel Event
            </button>
          </div>
        );
      }}
    />
  );
});
