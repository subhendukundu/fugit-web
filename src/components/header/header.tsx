import { component$, Slot } from "@builder.io/qwik";
import type { ActionStore, FailReturn } from "@builder.io/qwik-city";
import { Link, useLocation } from "@builder.io/qwik-city";
import { FugitIcon } from "../icons/logo";
import UserDropdown from "../user-dropdown/user-dropdown";

export const NavLink = component$(({ href, isActive }: any) => {
  return (
    <Link
      href={href}
      class={
        isActive
          ? "text-primary active sm:mr-8 mr-4"
          : "transition hover:text-primary sm:mr-8 mr-4"
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
    href: "/explore/",
  },
];

interface Props {
  isLoggedIn: boolean;
  userName: string;
  email: string;
  logoutAction: ActionStore<
    FailReturn<{ message: string }>,
    Record<string, any>,
    true
  >;
}

export default component$(
  ({ isLoggedIn, logoutAction, userName, email }: Props) => {
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
        <nav class="flex items-center" key={pathname}>
          <div class="flex text-sm font-medium">
            {navigation.map((nav) => (
              <NavLink
                href={nav.href}
                key={nav.href}
                isActive={pathname === nav.href}
              >
                {nav.name}
              </NavLink>
            ))}
          </div>
          {isLoggedIn ? (
            <UserDropdown
              options={[{ label: "Own Events", href: "/explore/own" }]}
              logoutAction={logoutAction}
              userName={userName}
              email={email}
            />
          ) : (
            <Link
              class="text-text block px-4 py-2 text-sm font-medium hover:bg-primary hover:bg-opacity-10"
              href="/login"
            >
              Login
            </Link>
          )}
        </nav>
      </header>
    );
  }
);
