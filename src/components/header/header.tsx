import { component$, Slot } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { FugitIcon } from "../icons/logo";

export const NavLink = component$(({ href, isActive }: any) => {
  return (
    <Link
      href={href}
      class={
        isActive
          ? "text-primary active dark:text-primary sm:mr-8 mr-4"
          : "transition hover:text-primary dark:hover:text-light "
      }
    >
      <Slot />
    </Link>
  );
});

export const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Explore",
    href: "/explore",
  },
];

export default component$(() => {
  const loc = useLocation();
  const { url } = loc;
  const { pathname } = url;
  return (
    <header class="flex items-center justify-between p-4 container mx-auto px-4">
      <Link href="/">
        <div class="flex items-center">
          <FugitIcon styles="w-24" />
        </div>
      </Link>
      <nav class="flex items-center">
        <div class="flex text-sm font-medium mr-4 md:mr-8">
          {navigation.map((nav) => (
            <NavLink
              href={nav.href}
              key={nav.href}
              isActive={pathname.includes(nav.href)}
            >
              {nav.name}
            </NavLink>
          ))}
        </div>
        <Link
          class="group flex items-center rounded-full bg-zinc-800/90 px-4 py-2 text-xs font-medium text-zinc-50 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur whitespace-nowrap transition hover:bg-zinc-600 dark:bg-zinc-100 dark:text-zinc-800 dark:ring-white/10 dark:hover:bg-zinc-200 sm:text-sm"
          href="/logout"
        >
          Logout
        </Link>
      </nav>
    </header>
  );
});
