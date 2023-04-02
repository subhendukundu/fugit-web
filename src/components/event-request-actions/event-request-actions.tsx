import { component$, Resource } from "@builder.io/qwik";
import type { RequestedEvent } from "~/types";

interface Props {
  action: any;
}

export default component$(({ action }: Props) => {
  return (
    <Resource
      value={action}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Failed to load event details</div>}
      onResolved={(request: RequestedEvent | null) => {
        if (request) {
          let statusText = "";
          switch (request.status) {
            case "pending":
              statusText = "Hang tight, still waiting for approval!";
              break;
            case "rejected":
              statusText = "Uh oh, looks like you're not on the guest list!";
              break;
            default:
              statusText = "Your request is being processed";
              break;
          }
          return <div class="text-gray-500">{statusText}</div>;
        } else {
          return (
            <button
              type="submit"
              class="py-2 px-8 text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
            >
              Request to join
            </button>
          );
        }
      }}
    />
  );
});
