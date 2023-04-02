import {
  component$,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";

export default component$(() => {
  const messagesEndRef = useSignal<HTMLDivElement>();

  useVisibleTask$(async () => {
    messagesEndRef.value?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
  });

  return <div ref={messagesEndRef}></div>;
});
