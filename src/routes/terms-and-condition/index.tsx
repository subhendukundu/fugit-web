import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { socialTags } from "~/config/social-tags";

export default component$(() => {
  return (
    <div class="p-4">
      <h1 class="mb-4 text-4xl">Fugit Terms and Conditions</h1>

      <p class="mb-4">
        Welcome to Fugit, the app that connects you to events and meet-ups
        tailored to your interests. By using Fugit, you agree to the following
        terms and conditions.
      </p>

      <h2 class="mb-2 text-2xl">1. Introduction</h2>

      <p class="mb-4">
        These Terms and Conditions govern your use of Fugit, a mobile
        application that allows users to discover, join, and create events and
        meet-ups.
      </p>

      <h2 class="mb-2 text-2xl">2. Definitions</h2>

      <p class="mb-4">
        In these Terms and Conditions, the following terms have the following
        meanings:
      </p>

      <ul class="mb-4 ml-6 list-disc">
        <li class="mb-2">
          “You” or “User” means any person who accesses or uses the Fugit app.
        </li>
        <li class="mb-2">
          “Fugit” or “App” means the Fugit mobile application.
        </li>
        <li class="mb-2">
          “Content” means any text, images, videos, audio, or other materials
          that Users post or share on the App.
        </li>
        <li class="mb-2">
          “Services” means the features and functionalities offered by the Fugit
          app.
        </li>
      </ul>

      <h2 class="mb-2 text-2xl">3. License to Use</h2>

      <p class="mb-4">
        Fugit grants you a non-exclusive, non-transferable, revocable license to
        use the App and its Services, subject to these Terms and Conditions.
      </p>

      <h2 class="mb-2 text-2xl">4. Acceptable Uses</h2>

      <p class="mb-4">
        You agree to use the App and its Services only for lawful purposes and
        in accordance with these Terms and Conditions. You agree not to use the
        App or its Services for any purpose that is prohibited by law or that is
        harmful to others.
      </p>

      <h2 class="mb-2 text-2xl">5. Prohibited Behaviors</h2>

      <p class="mb-4">
        You agree not to engage in any of the following prohibited behaviors
        while using the App or its Services:
      </p>

      <ul class="mb-4 ml-6 list-disc">
        <li class="mb-2">
          Creating multiple accounts or impersonating other Users.
        </li>
        <li class="mb-2">
          Posting or sharing Content that is false, misleading, hateful,
          discriminatory, obscene, or defamatory.
        </li>
        <li class="mb-2">Harassing, stalking, or threatening other Users.</li>
        <li class="mb-2">
          Violating the intellectual property rights of others.
        </li>
        <li class="mb-2">
          Using the App or its Services for commercial purposes without the
          prior written consent of Fugit.
        </li>
        <li class="mb-2">
          Attempting to gain unauthorized access to the App or its Services.
        </li>
      </ul>

      <h2 class="mb-2 text-2xl">6. Termination and Account Suspension</h2>

      <p class="mb-4">
        Fugit may, at its sole discretion, terminate your account or suspend
        your access to the App or its Services at any time, for any reason,
        without notice.
      </p>

      <h2 class="mb-2 text-2xl">7. Intellectual Property Protection</h2>

      <p class="mb-4">
        The Content on the App is protected by copyright, trademark, and other
        intellectual property laws. You agree not to copy, modify, distribute,
        or otherwise exploit the Content without the prior written consent of
        Fugit or the respective rights holder.
      </p>

      <h2 class="mb-2 text-2xl">8. User-Generated Content</h2>

      <p class="mb-4">
        You retain ownership of the Content you post or share on the App.
        However, you grant Fugit a non-exclusive, royalty-free, worldwide
        license to use, reproduce, modify, adapt, publish, translate, create
        derivative works from, distribute, and display your Content in
        connection with the provision of the App and its Services.
      </p>

      <h2 class="mb-2 text-2xl">9. Payment Clauses</h2>

      <p class="mb-4">
        If you use any paid features or Services offered by Fugit, you agree to
        pay the applicable fees as set forth in the App. You agree to provide
        Fugit with accurate and complete payment information.
      </p>

      <h2 class="mb-2 text-2xl">10. Privacy Policy Information</h2>

      <p class="mb-4">
        Fugit collects and uses your personal information in accordance with its
        Privacy Policy. You agree to review and comply with the Privacy Policy.
      </p>

      <h2 class="mb-2 text-2xl">11. Limitation of Liability</h2>

      <p class="mb-4">
        Fugit is not liable for any damages arising from your use of the App or
        its Services. This includes, but is not limited to, damages for loss of
        data, loss of profits, or personal injury.
      </p>

      <h2 class="mb-2 text-2xl">12. Disclaimers and Warranties</h2>

      <p class="mb-4">
        THE APP AND ITS SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE”
        BASIS. FUGIT MAKES NO WARRANTIES, EXPRESS OR IMPLIED, ABOUT THE
        OPERATION OF THE APP OR ITS SERVICES, INCLUDING, BUT NOT LIMITED TO, THE
        IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
        AND NON-INFRINGEMENT. YOU EXPRESSLY AGREE THAT YOUR USE OF THE APP AND
        ITS SERVICES IS AT YOUR SOLE RISK.
      </p>

      <p class="mb-4">
        FUGIT SHALL NOT BE LIABLE FOR ANY DAMAGES WHATSOEVER, INCLUDING, BUT NOT
        LIMITED TO, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL,
        EXEMPLARY, OR PUNITIVE DAMAGES, ARISING OUT OF OR IN CONNECTION WITH
        YOUR USE OF THE APP OR ITS SERVICES, EVEN IF FUGIT HAS BEEN ADVISED OF
        THE POSSIBILITY OF SUCH DAMAGES.
      </p>

      <p>
        SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES OR
        THE LIMITATION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO
        THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU.
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Fugit - Terms and Conditions",
  meta: [
    {
      name: "description",
      content:
        "These are the terms and conditions for using Fugit, the app that connects you to events and meet-ups tailored to your interests. By using Fugit, you agree to these terms.",
    },
    {
      name: "keywords",
      content:
        "Fugit, terms and conditions, user agreement, app usage, legal, policy",
    },
    ...socialTags,
  ],
};
