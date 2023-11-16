import { Slot } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import LoadingCircle from "../loading-circle/loading-circle";

type Props = {
  isRunning: boolean;
  label?: string;
  type: "submit" | "reset" | "button" | undefined;
  styles?: string;
  onClick$?: any;
  disabled?: boolean;
};

export default component$<Props>(
  ({ isRunning, label, styles, type = "submit", onClick$, disabled }) => {
    return (
      <button
        type={type}
        class={`${styles} inline-flex items-center justify-center transition active:transition-none py-2 px-8 text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark ${
          isRunning || disabled ? "pointer-events-none" : ""
        }`}
        onClick$={onClick$}
        disabled={disabled}
      >
        {isRunning && <LoadingCircle />}
        {label}
        <Slot />
      </button>
    );
  }
);
