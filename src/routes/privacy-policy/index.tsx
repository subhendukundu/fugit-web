import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { socialTags } from "~/config/social-tags";

export default component$(() => {
  return (
    <div class="p-4">
      <h1 class="text-4xl mb-4">Fugit Privacy Policy</h1>

      <p class="mb-4">
        Welcome to Fugit, the app that connects you to events and meet-ups tailored to your interests.
        This Privacy Policy explains how we collect, use, and disclose your personal information when you use our app.
      </p>

      <h2 class="text-2xl mb-2">1. Information We Collect</h2>

      <p class="mb-2">We collect the following types of information from you:</p>

      <ul class="list-disc ml-6 mb-4">
        <li class="mb-2">
          <strong>Personal Information:</strong> This includes your name, email address, phone number, and any other information you provide to us when you create an account, join an event, or contact customer support.
        </li>
        <li class="mb-2">
          <strong>Usage Information:</strong> This includes information about how you use our app, such as the events you join, the groups you follow, and the searches you perform.
        </li>
        <li class="mb-2">
          <strong>Device Information:</strong> This includes information about the device you use to access our app, such as your device type, operating system version, and IP address.
        </li>
      </ul>

      <h2 class="text-2xl mb-2">2. How We Use Your Information</h2>

      <p class="mb-2">We use your information to:</p>

      <ul class="list-disc ml-6 mb-4">
        <li class="mb-2">Provide you with the services you request, such as joining events, creating groups, and sending messages.</li>
        <li class="mb-2">Improve our app and services.</li>
        <li class="mb-2">Send you marketing communications, such as email newsletters and push notifications.</li>
        <li class="mb-2">Detect and prevent fraud and abuse.</li>
        <li class="mb-2">Comply with legal and regulatory requirements.</li>
      </ul>

      <h2 class="text-2xl mb-2">3. How We Share Your Information</h2>

      <p class="mb-2">We may share your information with the following third parties:</p>

      <ul class="list-disc ml-6 mb-4">
        <li class="mb-2">Service providers who help us provide our services, such as hosting our app and sending emails.</li>
        <li class="mb-2">Law enforcement agencies and other government officials, if required by law.</li>
        <li class="mb-2">Other third parties with your consent.</li>
      </ul>

      <h2 class="text-2xl mb-2">4. Your Choices</h2>

      <p class="mb-2">You have the following choices regarding your information:</p>

      <ul class="list-disc ml-6 mb-4">
        <li class="mb-2">You can access, correct, or delete your information by logging into your account and visiting the settings page.</li>
        <li class="mb-2">You can unsubscribe from marketing communications by clicking on the "unsubscribe" link at the bottom of any marketing email.</li>
        <li class="mb-2">You can opt out of having your information shared with third parties for marketing purposes by contacting us at [email address].</li>
      </ul>

      <h2 class="text-2xl mb-2">5. Data Security</h2>

      <p class="mb-4">
        We take reasonable security measures to protect your information from unauthorized access, use, disclosure, alteration, or destruction.
      </p>

      <h2 class="text-2xl mb-2">6. International Data Transfers</h2>

      <p class="mb-4">
        Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have different data protection laws than your country of residence.
      </p>

      <h2 class="text-2xl mb-2">7. Changes to This Privacy Policy</h2>

      <p class="mb-4">
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the updated Privacy Policy on our website and sending you an email notification.
      </p>

      <h2 class="text-2xl mb-2">8. Contact Us</h2>

      <p class="mb-4">
        If you have any questions about this Privacy Policy, please contact us at contact@higgle.io.
      </p>
    </div>
  );
});


export const head: DocumentHead = {
  title: "Privacy Policy",
  meta: [
    {
      name: "description",
      content:
        "This is the privacy policy for our app. By using our app, you agree to this policy.",
    },
    {
      name: "keywords",
      content:
        "Privacy Policy, user agreement, app usage, legal, policy",
    },
    ...socialTags,
  ],
};
