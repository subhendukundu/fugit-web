import type { NoSerialize } from "@builder.io/qwik";
import {
  component$,
  noSerialize,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { formatDistanceToNow } from "date-fns";
import AlwaysScrollToBottom from "../always-scroll-to-bottom/always-scroll-to-bottom";
import { Ghost } from "../icons/ghost";

interface Props {
  baseWssUrl: string;
  name: string;
  token: string;
}

interface Message {
  message: string;
  name: string;
  avatar?: string;
  timestamp: number;
}

interface Store {
  messages: Message[];
}

function replaceWithMessage(message: any) {
  if (message?.error) {
    return [
      {
        message: message?.error,
        name: "Fugit",
        avatar: "/fugit-logomark.svg",
        timestamp: Date.now(),
      },
    ];
  } else if (message.joined || message.ready || message.quit) {
    return [];
  } else {
    return [message];
  }
}

export default component$(({ baseWssUrl, token }: Props) => {
  const value = useSignal("");
  const messagesEndRef = useSignal<HTMLDivElement>();
  const websocketRef = useSignal<NoSerialize<WebSocket>>();
  const loc = useLocation();
  const { id } = loc.params;
  const store = useStore<Store>({
    messages: [
      {
        message:
          "Don't be shy! Say hello and get the conversation started in The Social Lounge.",
        name: "Fugit",
        avatar: "/fugit-logomark.svg",
        timestamp: Date.now(),
      },
    ] as any,
  });

  useVisibleTask$(async () => {
    const ws = new WebSocket(`${baseWssUrl}/events/${id}/chat`);
    websocketRef.value = noSerialize(ws);
    const payload = {
      type: "connection_init",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const receiveHandler = async (event: any) => {
      const message = JSON.parse(event.data);
      const data = replaceWithMessage(message);
      store.messages = [...store.messages, ...data];
    };

    ws.addEventListener("open", () => {
      ws.send(JSON.stringify(payload));
    });

    ws.addEventListener("message", receiveHandler);

    return () => {
      ws.removeEventListener("message", receiveHandler);
    };
  });

  const messageContent = store.messages.map(
    (message, index) =>
      message && (
        <div key={index} class="mt-3">
          <div class="flex items-end">
            <div class="flex flex-col space-y-2 text-xs max-w-[80%]">
              <div class="font-bold text-gray-900">{message?.name}</div>
              <div class="bg-tertiary bg-opacity-80 rounded-lg px-4 py-2">
                <p class="text-white">{message?.message}</p>
              </div>
            </div>
            {message?.avatar ? (
              <img
                src={message?.avatar}
                alt="avatar"
                class="w-6 h-6 rounded-full"
              />
            ) : (
              <Ghost />
            )}
            <span class="text-xs truncate text-tertiary">
              {formatDistanceToNow(new Date(message?.timestamp), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      )
  );

  return (
    <>
      <div class="flex-1 justify-between flex flex-col h-[calc(100vh-200px)] bg-[url('/fugit-hello.svg')] bg-no-repeat bg-center bg-right">
        <div class="text-md font-semibold text-text justify-between pb-2 border-b border-opacity-30 border-primary">
          The Social Lounge
        </div>
        <div class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          <div ref={messagesEndRef}>
            {messageContent}
            <AlwaysScrollToBottom key={messagesEndRef?.value?.clientHeight} />
          </div>
        </div>
      </div>
      <div class="border-t border-opacity-30 border-primary px-4 mb-2 sm:mb-0">
        <form
          class="flex"
          preventdefault:submit
          onSubmit$={() => {
            if (value.value?.length > 0) {
              websocketRef.value?.send(
                JSON.stringify({ message: value.value })
              );
              value.value = "";
              // messagesEndRef.value?.scrollBy(0, 1e8);
            }
          }}
        >
          <textarea
            placeholder="Type your message here..."
            class="text-sm text-text flex-grow focus:outline-none"
            bind:value={value}
          />
          <button class="ml-4" type="submit">
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
              class="fill-primary w-6 h-6"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
});
