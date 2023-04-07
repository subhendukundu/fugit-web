import {
  component$,
  noSerialize,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import lottie from "lottie-web";

export interface Options {
  container?: any;
  renderer?: "svg";
  loop?: boolean;
  autoplay?: boolean;
  animationData?: object;
  path?: string;
  rendererSettings?: object;
  name?: string;
}

const options: Options = {
  path: "/loading-screen.json",
};

export default component$(() => {
  const store = useStore({
    anim: noSerialize({}),
  });

  const canvas = useSignal<HTMLElement>();

  useVisibleTask$(() => {
    store.anim = noSerialize(
      lottie.loadAnimation({
        container: options.container || canvas.value,
        renderer: options.renderer || "svg",
        loop: options.loop || true,
        autoplay: options.autoplay || true,
        animationData: options.animationData,
        path: options.path,
        rendererSettings: options.rendererSettings,
        name: options.name,
      })
    );
  });

  return (
    <div class="flex flex-col items-center justify-center">
      <div class="max-w-sm" ref={canvas}></div>
      <p class="text-gray-500 text-sm mt-2">This can take upto ~30 seconds...</p>
    </div>
  );
});