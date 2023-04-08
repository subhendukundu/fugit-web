import type { Signal } from "@builder.io/qwik";
import { Slot, component$, useSignal } from "@builder.io/qwik";
import * as Icons from "../icons/search-result-icons";
import type {
  Idea,
  IdeaWithPlace,
  IdeaWithPlaces,
  WeightedPlace,
} from "~/types";
import { callApi } from "~/utils/fetch";
import LoadingCircle from "../loading-circle/loading-circle";

interface Props {
  more?: boolean;
  defaultOpen?: boolean;
  idea: Idea;
  places?: WeightedPlace[];
  level?: number;
  results?: IdeaWithPlaces[];
  baseUrl: string;
  description?: string;
  selectedEvent: Signal<IdeaWithPlace | undefined>;
}

const Tree = component$((props: Props) => {
  const {
    more,
    defaultOpen = false,
    idea,
    places,
    level = 0,
    results = [],
    baseUrl,
    selectedEvent,
  } = props;

  const isOpen = useSignal(defaultOpen);
  const isLoading = useSignal(false);
  const searchResults = useSignal<IdeaWithPlaces[]>(results);
  const iconName = more ? (isOpen.value ? "Minus" : "Plus") : "Close";

  const Icon = Icons[`${iconName}SquareO`];

  console.log("level", level, more);

  return (
    <div>
      <div class="flex items-center mb-2">
        {isLoading.value ? (
          <LoadingCircle styles="fill-primary" />
        ) : (
          <button
            class={`mr-4 duration-300 transition-all ${
              more ? "opacity-100 cursor-pointer" : "opacity-30"
            }`}
            disabled={!more}
            onClick$={async () => {
              if (searchResults.value.length) {
                isOpen.value = !isOpen.value;
                return void 0;
              }

              isLoading.value = true;
              const result: any = await callApi(
                {
                  endpoint: `/search?q=${idea.activity_name} at ${idea.location}`,
                  method: "GET",
                },
                baseUrl
              );
              isOpen.value = !isOpen.value;
              isLoading.value = false;
              searchResults.value = result?.results;
            }}
          >
            <Icon class="w-4 h-4" />
          </button>
        )}
        <button
          class={`text-left p-2 ${
            selectedEvent.value?.idea.activity_name === idea.activity_name
              ? "bg-primary bg-opacity-10 rounded-sm	"
              : ""
          }`}
          disabled={level === 0}
          onClick$={() => {
            if (
              !places?.[0] ||
              selectedEvent.value?.idea.activity_name === idea.activity_name
            ) {
              return void 0;
            }
            selectedEvent.value = {
              idea,
              place: places?.[0],
            };
          }}
        >
          <h2
            class={`text-sm font-semibold ${
              level === 0 ? "text-tertiary" : "text-text"
            }`}
          >
            {idea?.activity_name}
          </h2>
          {idea?.short_description && (
            <p class="text-xs font-normal mb-6">{idea?.short_description}</p>
          )}
        </button>
      </div>
      <div
        class={`will-change-transform ml-2 pl-4 border-l border-dashed border-gray-700 overflow-hidden ${
          isOpen.value ? "max-h-full" : "max-h-0"
        }`}
      >
        <div key="content">
          <Slot />
          {searchResults?.value?.map(({ idea, places }: any) => (
            <Tree
              key={idea.activity_name}
              more={level + 1 < 2}
              idea={idea}
              places={places}
              baseUrl={baseUrl}
              selectedEvent={selectedEvent}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Tree;
