import { siteUrl } from "@/lib/urls";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Privacy Policy";
const description =
  "How the UAT Pocket iPhone and Android apps and website collect, use, store, share, retain, and delete personal information.";
const privacyEmail = "verusvibe@gmail.com";
const effectiveDate =
  process.env.NEXT_PUBLIC_EFFECTIVE_DATE?.trim() ||
  "To be published with the app release";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: siteUrl("/privacy/") },
  openGraph: {
    title: `${title} | UAT Pocket`,
    description,
    url: siteUrl("/privacy/"),
    images: [siteUrl("/og.png")],
  },
  twitter: {
    card: "summary",
    title: `${title} | UAT Pocket`,
    description,
  },
};

type PolicySection = {
  id: string;
  title: string;
  content: ReactNode;
};

const sections: PolicySection[] = [
  {
    id: "responsible",
    title: "1. Who is responsible",
    content: (
      <>
        <p>
          UAT Pocket is operated by Verus Vibe (&ldquo;we&rdquo;). For questions
          about this policy or your personal information, contact{" "}
          <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.
        </p>
        <p>
          UAT Pocket is a business tool. When your organisation uses UAT Pocket
          for a project, the project&apos;s content, including issues, evidence,
          comments and history, belongs to that project and is visible to its
          members according to their roles.
        </p>
      </>
    ),
  },
  {
    id: "information",
    title: "2. Information we process",
    content: (
      <>
        <p>
          <strong>Account information:</strong> your display name, email
          address, user ID, sign-in method (email and password, or Sign in with
          Apple), the organisation name and type you enter, and your project
          memberships and roles.
        </p>
        <p>
          <strong>Project content you add:</strong> issue titles and
          descriptions, expected and actual results, severity, category, module,
          environment and build information, quick notes, voice transcripts,
          comments, fix descriptions and build numbers, photos and screenshots
          you attach as evidence (up to five per issue, plus retest evidence),
          and the issue&apos;s status history.
        </p>
        <p>
          <strong>Voice recordings:</strong> recordings are made on your device
          and transcribed by your device&apos;s speech recognition service:
          Apple&apos;s speech recognition on iPhone, or the speech recognition
          service configured on your Android device (Android 13 or later). Either
          may process the audio on the provider&apos;s servers. The audio is not
          uploaded to UAT Pocket; only the transcript you review and keep is
          saved with the issue. The temporary recording stays on your device and
          is deleted when you discard or re-record it, or when you leave the
          recording screen.
        </p>
        <p>
          <strong>Device and notification information:</strong> a push
          notification token, a random device identifier created by the app, the
          platform and the app version, used to deliver notifications to your
          device.
        </p>
        <p>
          <strong>Analytics and diagnostics:</strong> limited usage events, such
          as an issue being submitted or an AI draft being requested, and crash
          and error reports containing error codes. Crash reports also include
          technical details such as the device model, operating-system version
          and app version. Firebase Analytics and Crashlytics do not receive
          defect content, comments, form messages or email addresses. The apps
          do not collect advertising identifiers; on Android, Advertising ID
          collection and ad-personalisation signals are turned off.
        </p>
        <p>
          <strong>Issue exports:</strong> when a project owner or admin exports
          issues, a spreadsheet of the selected project&apos;s issues and
          comments is emailed to the project members they choose.
        </p>
        <p>
          <strong>Website:</strong> the fields you submit in the early-access or
          support forms.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "3. How information is used",
    content: (
      <p>
        We use information to create and secure your account; run projects and
        the issue lifecycle from capture through closure; send notifications and
        requested exports; respond to your requests; and keep the service
        reliable and secure. We do not sell personal information and do not use
        it for advertising or cross-app tracking.
      </p>
    ),
  },
  {
    id: "ai",
    title: "4. Optional AI drafting",
    content: (
      <>
        <p>
          AI drafting is optional. The first time you use it, the app explains
          what will be sent and asks for your permission. If you allow it, the
          evidence images you selected, your voice transcript, your quick note,
          the project name and environment, and any selected test-case details
          are sent to Google&apos;s Gemini model through Firebase AI Logic to
          produce a draft.
        </p>
        <p>
          The draft is only a suggestion: you review and edit every field, and
          nothing is submitted until you choose <strong>Submit Issue</strong>.
          You can always create issues manually instead, and you can withdraw
          permission at any time in{" "}
          <strong>Me → Privacy → Withdraw AI Drafting Permission</strong>.
        </p>
        <p>
          Google processes AI requests under the Firebase AI Logic and Gemini
          terms that apply to UAT Pocket&apos;s service configuration.
        </p>
      </>
    ),
  },
  {
    id: "providers",
    title: "5. Service providers",
    content: (
      <>
        <ul>
          <li>
            <strong>Google (Firebase):</strong> authentication, database, file
            storage, server functions, push notifications, app integrity checks,
            remote configuration, analytics, Crashlytics crash reporting and AI
            drafting through Gemini.
          </li>
          <li>
            <strong>Apple:</strong> Sign in with Apple, if you choose it (on
            iPhone and Android); on iPhone, also speech recognition and
            push-notification delivery. Apple&apos;s speech recognition may
            process audio on Apple&apos;s servers.
          </li>
          <li>
            <strong>Your Android device&apos;s speech recognition provider:</strong>{" "}
            voice transcription on Android. Processing and retention follow the
            terms of the provider configured on your device (often Google).
          </li>
          <li>
            <strong>Resend:</strong> delivery of issue-export emails.
          </li>
        </ul>
        <p>
          These providers process information on our behalf under their own
          terms.
        </p>
      </>
    ),
  },
  {
    id: "location",
    title: "6. Where information is stored",
    content: (
      <p>
        The project database and server functions run in Google Cloud&apos;s
        Singapore region (asia-southeast1). Evidence files are stored in private
        Firebase Cloud Storage. Some providers, including Firebase
        Authentication, Analytics, Crashlytics, Apple, your device&apos;s speech
        recognition provider and Resend, may process information in other
        countries, including the United States.
      </p>
    ),
  },
  {
    id: "security",
    title: "7. Security",
    content: (
      <>
        <p>
          Access to project data requires a signed-in, email-verified account
          that is a member of the project, and is enforced by server-side rules
          based on each member&apos;s role. Evidence is stored in private
          storage that only project members can access.
        </p>
        <p>
          No service can guarantee absolute security. Do not put passwords or
          secrets in evidence, comments or support messages.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "8. Retention and deletion",
    content: (
      <ul>
        <li>
          <strong>Your account:</strong> kept until you delete it.
        </li>
        <li>
          <strong>Project content:</strong> kept as part of the project&apos;s
          record while the project exists, including after an individual member
          deletes their account.
        </li>
        <li>
          <strong>Issue-export files:</strong> deleted from storage after 7
          days.
        </li>
        <li>
          <strong>Backups:</strong> daily database backups are kept for 14 days,
          and point-in-time recovery data for 7 days. After those periods,
          deleted information is no longer recoverable through those systems.
        </li>
        <li>
          <strong>Analytics and crash reports:</strong> kept according to the
          configured Firebase Analytics and Crashlytics retention settings.
        </li>
      </ul>
    ),
  },
  {
    id: "deletion",
    title: "9. Deleting your account",
    content: (
      <>
        <p>
          You can delete your account in the app:{" "}
          <strong>Me → Delete Account</strong>, then confirm with your password
          or with Sign in with Apple. Deletion:
        </p>
        <ul>
          <li>
            permanently deletes your profile, notifications, device
            registrations and sign-in account;
          </li>
          <li>
            removes you from every project and unassigns open issues that were
            assigned to you;
          </li>
          <li>
            revokes UAT Pocket&apos;s access to your Apple ID if you used Sign
            in with Apple; and
          </li>
          <li>deletes unsent capture drafts stored on that device.</li>
        </ul>
        <p>
          Issues, comments and evidence you added stay with their projects so
          that the UAT record remains complete; your name is shown as
          &ldquo;Deleted user&rdquo;. Backup copies expire as described above.
        </p>
        <p>
          If you cannot access the app, contact{" "}
          <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a> from the email
          address on your account. Never send your password.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "10. Your choices and rights",
    content: (
      <>
        <p>
          Depending on where you live, for example under Singapore&apos;s
          Personal Data Protection Act or the EU or UK GDPR, you may have rights
          to access, correct or delete your personal information, to object to
          or restrict its use, to data portability, and to withdraw consent.
          Contact <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a> to make
          a request; we may need to verify your identity.
        </p>
        <p>
          You can also manage camera, photo, microphone, speech-recognition (on
          iPhone) and notification permissions in your device&apos;s Settings,
          and withdraw AI drafting permission in the app.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "11. Business audience and children",
    content: (
      <p>
        UAT Pocket is intended for business UAT teams and is not directed to
        children. If you believe a child has provided personal information,
        contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "12. Changes and contact",
    content: (
      <p>
        We will update this policy when our practices change and show the new
        effective date at the top. Material changes will be communicated in the
        app or by email. Questions:{" "}
        <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main id="main" className="container">
      <div className="document-heading">
        <span className="eyebrow">UAT POCKET PRIVACY</span>
        <h1>Privacy Policy</h1>
        <p className="lead">
          This policy explains how UAT Pocket handles personal information
          across the iPhone and Android apps and this website.
        </p>
        <p>
          <strong>Effective:</strong> {effectiveDate}
        </p>
      </div>

      <div className="document-layout" aria-label="Privacy policy">
        <nav className="toc" aria-label="Privacy policy contents">
          <strong>On this page</strong>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="policy-content">
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
