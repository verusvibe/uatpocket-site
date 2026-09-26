import { sitePath, siteUrl } from "@/lib/urls";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: siteUrl("/privacy/") },
  openGraph: {
    images: [siteUrl("/og.png")],
    title: "UAT Pocket — Privacy Policy",
    url: siteUrl("/privacy/"),
  },
};
const owner = process.env.NEXT_PUBLIC_LEGAL_ENTITY || "[LEGAL ENTITY]";
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[CONTACT EMAIL]";
const date = process.env.NEXT_PUBLIC_EFFECTIVE_DATE || "[EFFECTIVE DATE]";
const retention =
  process.env.NEXT_PUBLIC_RETENTION_POLICY || "[RETENTION POLICY]";
const regions =
  process.env.NEXT_PUBLIC_PROCESSING_REGIONS ||
  "[PROCESSING REGIONS AND TRANSFER SAFEGUARDS]";
const sections = [
  [
    "operator",
    "Who is responsible",
    `UAT Pocket is operated by ${owner}. For questions about this policy or your personal information, contact ${email}. Effective date: ${date}.`,
  ],
  [
    "information",
    "Information we process",
    "Account information can include your display name, email address, user ID, organisation and project membership. User content includes issue details, comments, images, quick notes, voice transcripts, fix/build information and retest evidence. We may also process notification tokens, device and app information, analytics events, diagnostics and operational logs. Website requests include the fields you choose to submit in the early-access or support form.",
  ],
  [
    "purposes",
    "How information is used",
    "Information is used for authentication, project collaboration, issue processing, ownership and lifecycle tracking, notifications, responding to requests, security and product reliability. Minimal analytics help understand product outcomes. Sensitive defect content, form messages and email addresses must not be included in analytics parameters.",
  ],
  [
    "providers",
    "Service providers",
    "The planned architecture uses Firebase and Google services for authentication, databases, private storage, notifications, analytics, diagnostics and AI assistance. Apple authentication and speech services may be used where applicable. Third-party AI processing is described below. The operator must confirm the final provider list and applicable provider terms before launch: [SERVICE PROVIDER DETAILS].",
  ],
  [
    "ai",
    "Optional AI and human review",
    "After the required disclosure and permission, selected evidence, an edited transcript, a quick note, project/environment information and selected test-case context may be sent to the configured AI provider for draft generation. Review evidence for confidential information before choosing AI assistance. AI output is an editable suggestion: a person must review it and explicitly choose Submit Issue. Manual creation remains available. Provider retention and data-use terms require confirmation: [AI PROCESSING TERMS].",
  ],
  [
    "storage",
    "Storage and security",
    "Project membership is the primary access boundary. The architecture uses authenticated access and role-aware server rules, private cloud storage paths for evidence, and retained issue lifecycle history. Access to project data depends on membership and role. No service can guarantee absolute security. Avoid submitting passwords or secrets in evidence or support messages.",
  ],
  [
    "retention",
    "Retention and deletion",
    `Information should be retained only for the service purposes and applicable obligations. The operator must specify retention periods for accounts, project content, evidence, voice recordings, logs, analytics, support requests and backups, including what happens to shared issue history after account deletion. Retention policy: ${retention}.`,
  ],
  [
    "international",
    "International processing",
    `Service providers may process information outside your country. The operator must confirm processing locations, applicable transfer mechanisms and safeguards before launch. ${regions}.`,
  ],
  [
    "rights",
    "Your choices and rights",
    `Depending on applicable law, you may have rights to access, correct, delete, restrict or object to processing, request portability or withdraw consent where processing relies on consent. Contact ${email} to make a privacy request. Identity verification may be necessary. The operator must confirm the applicable legal bases and jurisdiction-specific rights: [LEGAL BASES AND USER RIGHTS]. You can choose manual issue creation and manage device permissions and notifications.`,
  ],
  [
    "deletion",
    "Requesting account deletion",
    `Use the Support page and select Account deletion, or contact ${email}. Provide the email associated with your account, but never your password. The operator will need to verify your identity and explain any shared project history or legally required records that must be retained, in accordance with the final retention policy. No response deadline is promised here.`,
  ],
  [
    "children",
    "Business audience and children",
    "UAT Pocket is intended for business UAT teams and is not directed to children. If you believe a child has provided personal information, contact the operator to request review and appropriate deletion. The operator must confirm any applicable minimum age requirements before launch.",
  ],
  [
    "updates",
    "Policy updates and contact",
    `This policy may be updated as the service and its data practices evolve. Material changes will be communicated through an appropriate service channel. The effective date will identify the current version. Questions and privacy concerns: ${email}.`,
  ],
];
export default function Privacy() {
  const replacements: Record<string, string> = {
    "[SERVICE PROVIDER DETAILS]":
      process.env.NEXT_PUBLIC_SERVICE_PROVIDER_DETAILS ||
      "[SERVICE PROVIDER DETAILS]",
    "[AI PROCESSING TERMS]":
      process.env.NEXT_PUBLIC_AI_PROCESSING_TERMS || "[AI PROCESSING TERMS]",
    "[LEGAL BASES AND USER RIGHTS]":
      process.env.NEXT_PUBLIC_LEGAL_BASES || "[LEGAL BASES AND USER RIGHTS]",
  };
  return (
    <main id="main" className="container">
      <div className="document-heading">
        <span className="eyebrow">PRIVACY & CONTROL</span>
        <h1>Privacy Policy</h1>
        <p className="lead">
          Understand what information supports your UAT workflow and the choices
          you have.
        </p>
        <p className="notice">
          Policy draft for owner review. Visible bracketed fields must be
          completed before launch. Effective date: {date}.
        </p>
      </div>
      <div className="document-layout">
        <nav className="toc" aria-label="Privacy policy contents">
          {sections.map(([id, title]) => (
            <a href={`#${id}`} key={id}>
              {title}
            </a>
          ))}
        </nav>
        <div className="policy-content">
          {sections.map(([id, title, text]) => (
            <section id={id} key={id}>
              <h2>{title}</h2>
              <p>
                {Object.entries(replacements).reduce(
                  (s, [key, val]) => s.replace(key, val),
                  text,
                )}
              </p>
              {id === "deletion" && (
                <p>
                  <a href={sitePath("/support#account-deletion")}>
                    Read account deletion guidance
                  </a>{" "}
                  or{" "}
                  <a href={sitePath("/support#support-form")}>
                    send a support request
                  </a>
                  .
                </p>
              )}
            </section>
          ))}
          <div className="notice">
            <a href={sitePath("/support")}>Get support</a> ·{" "}
            <a href={sitePath("/#early-access")}>Request Early Access</a>
          </div>
        </div>
      </div>
    </main>
  );
}
