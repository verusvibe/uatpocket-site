import { sitePath, siteUrl } from "@/lib/urls";
import type { Metadata } from "next";

const title = "Delete your UAT Pocket account";
const description =
  "How to delete your UAT Pocket account and its data, in the iPhone or Android app or by email, and what is deleted or kept.";
const privacyEmail = "verusvibe@gmail.com";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description,
  alternates: { canonical: siteUrl("/delete-account/") },
  openGraph: {
    title: `${title} | UAT Pocket`,
    description,
    url: siteUrl("/delete-account/"),
    images: [siteUrl("/og.png")],
  },
};

export default function DeleteAccountPage() {
  return (
    <main id="main" className="container">
      <div className="document-heading">
        <span className="eyebrow">UAT POCKET ACCOUNT</span>
        <h1>Delete your account</h1>
        <p className="lead">
          How to delete your UAT Pocket account and the personal data linked to
          it. UAT Pocket is developed by Verus Vibe.
        </p>
      </div>

      <article className="policy-content">
        <section id="in-app">
          <h2>Delete in the app</h2>
          <p>
            In the UAT Pocket app on iPhone or Android, open{" "}
            <strong>Me → Delete Account</strong>, then confirm with your
            password or with Sign in with Apple. Your account is deleted
            immediately.
          </p>
        </section>

        <section id="request">
          <h2>Request deletion without the app</h2>
          <p>
            If you no longer have the app or cannot sign in, email{" "}
            <a
              href={`mailto:${privacyEmail}?subject=${encodeURIComponent("UAT Pocket account deletion request")}`}
            >
              {privacyEmail}
            </a>{" "}
            from the email address on your UAT Pocket account, with the subject
            &ldquo;UAT Pocket account deletion request&rdquo;.
          </p>
          <ul>
            <li>
              We may ask you to confirm the request from that address before we
              act on it.
            </li>
            <li>
              We delete the account within 30 days of confirming the request and
              reply when it is done.
            </li>
            <li>Never send your password.</li>
          </ul>
        </section>

        <section id="deleted">
          <h2>What is deleted</h2>
          <ul>
            <li>
              Your profile, notifications, device registrations and sign-in
              account.
            </li>
            <li>
              Your project memberships: you are removed from every project, and
              open issues assigned to you are unassigned.
            </li>
            <li>
              UAT Pocket&apos;s access to your Apple ID, if you used Sign in with
              Apple.
            </li>
            <li>
              When you delete in the app: unsent capture drafts stored on that
              device.
            </li>
          </ul>
        </section>

        <section id="kept">
          <h2>What is kept, and for how long</h2>
          <ul>
            <li>
              <strong>Project records:</strong> issues, comments and evidence you
              added stay with their projects so that each project&apos;s UAT
              record remains complete. Your name is shown as &ldquo;Deleted
              user&rdquo;. They are kept while the project exists, under the
              control of the project&apos;s owners.
            </li>
            <li>
              <strong>Backups:</strong> deleted data remains in daily backups
              for up to 14 days and in point-in-time recovery data for up to 7
              days, after which it is no longer recoverable.
            </li>
            <li>
              <strong>Analytics and crash reports:</strong> kept according to the
              configured Firebase Analytics and Crashlytics retention settings.
              They do not contain project content or email addresses.
            </li>
          </ul>
          <p>
            To delete specific data without deleting your account, or for other
            privacy requests, contact{" "}
            <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>. See the{" "}
            <a href={sitePath("/privacy#deletion")}>Privacy Policy</a> for full
            details.
          </p>
        </section>
      </article>
    </main>
  );
}
