import type { Signal } from "@builder.io/qwik";
import { Slot, component$, useSignal, $ } from "@builder.io/qwik";
import * as Icons from "../icons/search-result-icons";
import type {
  Idea,
  IdeaWithPlaces,
} from "~/types";
import { callApi } from "~/utils/fetch";
import LoadingCircle from "../loading-circle/loading-circle";
import TreeShimmer from "../tree-shimmer/tree-shimmer";

interface Props {
  more?: boolean;
  defaultOpen?: boolean;
  idea: Idea;
  level?: number;
  results?: IdeaWithPlaces[];
  baseUrl: string;
  description?: string;
  selectedIdea: Signal<Idea | undefined>;
}

const Tree = component$((props: Props) => {
  const {
    more,
    defaultOpen = false,
    idea,
    level = 0,
    results = [],
    baseUrl,
    selectedIdea,
  } = props;

  const isOpen = useSignal(defaultOpen);
  const isLoading = useSignal<boolean>(false);
  const error = useSignal<string>();
  const searchResults = useSignal<IdeaWithPlaces[]>(results);
  const iconName = more ? (isOpen.value ? "Minus" : "Plus") : "Close";

  const Icon = Icons[`${iconName}SquareO`];

  const loadMoreIdeas = $(async () => {
    if (!more) {
      return void 0;
    }
    if (searchResults.value.length) {
      isOpen.value = !isOpen.value;
      return void 0;
    }
    error.value = "";
    isLoading.value = true;
    const result: any = await callApi(
      {
        endpoint: `/search?q=${idea.activity_name} at ${idea.location}`,
        method: "GET",
      },
      baseUrl
    );
    if (result?.results) {
      searchResults.value = result?.results;
    } else {
      error.value = "An error occurred while generating ideas!";
    }
    isOpen.value = !isOpen.value;
    isLoading.value = false;
  });

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
            onClick$={loadMoreIdeas}
          >
            <Icon class="w-4 h-4" />
          </button>
        )}
        <button
          class={`text-left p-2 ${
            selectedIdea.value?.activity_name === idea.activity_name
              ? "bg-primary bg-opacity-10 rounded-sm	"
              : ""
          }`}
          disabled={level === 0}
          onClick$={() => {
            if (
              selectedIdea.value?.activity_name === idea.activity_name
            ) {
              return void 0;
            }
            selectedIdea.value = 
              idea;
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
      {isLoading.value && <TreeShimmer count={3} />}
      {error.value && (
        <div class="ml-2 pl-4 border-l border-dashed border-gray-700">
          <p class="text-red-500 text-xs italic mb-2">{error.value}</p>
          <button
            class="py-1 px-4 bg-transparent border border-primary text-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
            onClick$={loadMoreIdeas}
          >
            Retry
          </button>
        </div>
      )}
      <div
        class={`will-change-transform ml-2 pl-4 border-l border-dashed border-gray-700 overflow-hidden ${
          isOpen.value ? "max-h-full" : "max-h-0"
        }`}
      >
        <div key="content">
          <Slot />
          {searchResults?.value?.map(({ idea }: any) => (
            <Tree
              key={idea.activity_name}
              more={level + 1 < 2}
              idea={idea}
              baseUrl={baseUrl}
              selectedIdea={selectedIdea}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Tree;
