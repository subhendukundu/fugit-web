import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { callApi } from "~/utils/fetch";

interface Props {
  baseUrl: string;
  name: string;
  placeId: string;
  defaultValue: string;
}

export default component$(({ baseUrl, name, placeId, defaultValue }: Props) => {
  const ageResource = useResource$(async () => {
    const result: any = await callApi(
      {
        endpoint: `/places/${placeId}`,
        method: "GET",
      },
      baseUrl
    );
    return result;
  });
  return (
    <Resource
      value={ageResource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Failed to get Images</div>}
      onResolved={(places: any) => {
        return (
          <div class="flex flex-wrap gap-x-5 pt-4">
            {places.data.map((place: string) => (
              <label
                class="flex items-center h-full cursor-pointer pb-2"
                key={place}
              >
                <input
                  type="radio"
                  name="photos"
                  value={place}
                  checked={defaultValue === place}
                  class="peer sr-only"
                />
                <div class="peer-checked:border-primary border-2 rounded-lg p-4 flex flex-col justify-between h-full">
                  <div class="flex">
                    <div class="flex-shrink-0 h-32 w-32">
                      <img
                        src={`${baseUrl}/photos/${place}`}
                        alt={name}
                        class="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        );
      }}
    />
  );
});
