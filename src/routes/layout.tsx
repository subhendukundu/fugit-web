import { component$, Slot } from "@builder.io/qwik";
import { routeAction$, routeLoader$, useLocation } from "@builder.io/qwik-city";
import Header from "~/components/header/header";
import { decodeAccessToken, signOut } from "~/utils/auth";
import { getAccessTokenFromCookie } from "~/utils/fetch";

export const userAuthStateLoader = routeLoader$(
  ({ cookie, cacheControl, redirect, pathname }) => {
    const authState = getAccessTokenFromCookie(cookie);
    if (authState?.access_token) {
      const decodedToken = decodeAccessToken(authState?.access_token);

      if (!decodedToken?.email_verified && !pathname.includes("/verify/")) {
        throw redirect(302, "/verify");
      }

      return {
        loggedIn: true,
        accessToken: authState?.access_token,
        userName: decodedToken?.name,
        email: decodedToken?.email,
      };
    }

    cacheControl({
      noCache: true,
      private: true,
    });

    return {
      loggedIn: false,
    };
  }
);

export const useLogoutAction = routeAction$(
  async (data, { cookie, redirect, fail }) => {
    try {
      await signOut(cookie);
      throw redirect(302, "/login");
    } catch (e) {
      return fail(403, {
        message: "Unexpected error, please retry!",
      });
    }
  }
);

export default component$(() => {
  const authState = userAuthStateLoader();
  const logoutAction = useLogoutAction();
  const location = useLocation();

  return (
    <main class="flex flex-col min-h-screen container mx-auto px-4" role="main">
      {location.isNavigating && (
        <div class="container">
          <div class="h-1 w-full overflow-hidden bg-blue-200">
            <div class="h-full w-full bg-blue-500 origin-left animate-indeterminate"></div>
          </div>
        </div>
      )}
      <Header
        isLoggedIn={authState.value?.loggedIn}
        key={authState.value?.accessToken}
        userName={authState.value?.userName as string}
        email={authState.value?.email as string}
        logoutAction={logoutAction}
      />
      <div class="flex-1">
        <Slot />
      </div>
      <footer>
        <div class="flex flex-row items-center mb-4 text-sm text-primary font-semibold">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 stroke-primary fill-primary"
            stroke="currentColor"
            fill="currentColor"
          >
            <path
              d="M6 0.75C3.10078 0.75 0.75 3.10078 0.75 6C0.75 8.89922 3.10078 11.25 6 11.25C8.89922 11.25 11.25 8.89922 11.25 6C11.25 3.10078 8.89922 0.75 6 0.75ZM6 10.3594C3.59297 10.3594 1.64062 8.40703 1.64062 6C1.64062 3.59297 3.59297 1.64062 6 1.64062C8.40703 1.64062 10.3594 3.59297 10.3594 6C10.3594 8.40703 8.40703 10.3594 6 10.3594ZM6.06562 4.1168C6.68672 4.1168 7.10859 4.51289 7.15547 5.09414C7.15898 5.14336 7.2 5.18086 7.24922 5.18086H7.91367C7.94414 5.18086 7.96875 5.15625 7.96875 5.12578C7.96875 4.10977 7.16719 3.39844 6.06211 3.39844C4.77422 3.39844 4.03125 4.26797 4.03125 5.70469V6.31758C4.03125 7.74375 4.77422 8.60156 6.06211 8.60156C7.16367 8.60156 7.96875 7.9125 7.96875 6.94453C7.96875 6.91406 7.94414 6.88945 7.91367 6.88945H7.24805C7.19883 6.88945 7.15898 6.92695 7.1543 6.975C7.10508 7.51523 6.68438 7.88672 6.06445 7.88672C5.29922 7.88672 4.86797 7.32539 4.86797 6.32109V5.70469C4.86914 4.68516 5.30156 4.1168 6.06562 4.1168Z"
              fill="black"
              class="stroke-primary fill-primary"
            />
          </svg>
          fugit. 2023
        </div>
      </footer>
    </main>
  );
});
