import type { JSXNode } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { FormItem } from "~/types";
import EventPhotoSelector from "../event-photo-selector/event-photo-selector";

export type CASE = (props: {
  where: boolean;
  children: () => JSXNode;
}) => JSXNode;

export const Case: CASE = () => <></>;

export type SWITCH = (props: {
  default?: () => JSXNode;
  children: JSXNode[];
}) => JSXNode;

export const Switch: SWITCH = (props) => {
  for (const c of props.children) {
    if (c.props.where) {
      return c.props.children();
    }
  }
  return props.default ? props.default() : null;
};

export const FormField = component$(
  ({
    key,
    name,
    label,
    inputType,
    onChange,
    editable,
    column,
    options = [],
    defaultValue,
    hidden,
    baseUrl,
    placeId,
    errorMessage,
  }: any) => {
    return (
      <div class={hidden ? "sr-only" : "mb-4"} key={key}>
        <label class="block text-sm text-gray-700 mb-2" for={key}>
          {label}
        </label>

        <Switch
          default={() => (
            <>
              <input
                type="text"
                id={key}
                name={name}
                onChange$={onChange}
                readOnly={!editable}
                aria-label={label}
                value={defaultValue}
                class={`w-full px-3 py-2 text-sm border border-opacity-30 border-primary rounded ${
                  editable ? "" : "opacity-50 cursor-not-allowed"
                }`}
              />
            </>
          )}
        >
          <Case where={inputType === "datetime-local"}>
            {() => (
              <>
                <input
                  type="datetime-local"
                  id={key}
                  name={name}
                  onChange$={onChange}
                  readOnly={!editable}
                  aria-label={label}
                  value={(defaultValue || '').toString().substring(0, 16)}
                  class={`w-full px-3 py-2 text-sm border border-opacity-30 border-primary rounded ${
                    editable ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                />
              </>
            )}
          </Case>
          <Case where={inputType === "textarea"}>
            {() => (
              <>
                <textarea
                  id={key}
                  name={name}
                  onChange$={onChange}
                  readOnly={!editable}
                  aria-label={label}
                  value={defaultValue}
                  class="w-full px-3 py-2 text-sm border border-opacity-30 border-primary rounded"
                />
              </>
            )}
          </Case>

          <Case where={inputType === "photo_selector"}>
            {() => (
              <>
                <EventPhotoSelector
                  baseUrl={baseUrl}
                  name={name}
                  placeId={placeId}
                  defaultValue={defaultValue}
                />
              </>
            )}
          </Case>
          <Case where={inputType === "dropdown"}>
            {() => (
              <>
                <div class="relative">
                  <select
                    onChange$={onChange}
                    aria-label={label}
                    name={name}
                    class={`appearance-none rounded-md border border-zinc-900/10 py-2 px-3 block w-full sm:text-sm ${
                      editable ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    value={defaultValue}
                  >
                    {options.map((option: any) => (
                      <option
                        key={option.value}
                        value={option.value}
                        selected={defaultValue === option.value}
                      >
                        {option.label}
                      </option>
                    ))}
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
              </>
            )}
          </Case>
          <Case where={inputType === "radio"}>
            {() => (
              <div class={!column ? "flex" : ""}>
                {options.map((option: any) => (
                  <div
                    class={`flex items-center mr-4 ${column ? "mt-2" : ""}`}
                    key={`${name}-${option.value}-radio`}
                  >
                    <input
                      id={`${name}-${option.value}-radio`}
                      type="radio"
                      value={`${option.value}`}
                      name={name}
                      onChange$={onChange}
                      checked={defaultValue === option.value}
                      class={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                        defaultValue === option.value ? "checked" : ""
                      }`}
                    />
                    <label
                      for={`${name}-${option.value}-radio`}
                      class={`ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${
                        editable ? "" : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </Case>
        </Switch>
        <p class="text-red-500 text-xs italic">{errorMessage}</p>
      </div>
    );
  }
);

export default component$(
  ({
    schema,
    defaultValues,
    baseUrl,
    fieldErrors,
  }: {
    schema: Array<FormItem>;
    defaultValues: any;
    baseUrl: string;
    fieldErrors: any;
  }) => {
    return (
      <>
        {schema.map(({ key, ...rest }): any => (
          <FormField
            key={key}
            name={key}
            {...rest}
            defaultValue={defaultValues[key]}
            baseUrl={baseUrl}
            placeId={defaultValues.place_id}
            errorMessage={fieldErrors?.[key]}
          />
        ))}
      </>
    );
  }
);
