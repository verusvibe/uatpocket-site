import { sitePath, siteUrl } from "@/lib/urls";
import type { Metadata } from "next";
import { ContactForm } from "@/components/forms";
import { SupportTopics } from "@/components/support-topics";
export const metadata: Metadata = {
  title: "Support",
  alternates: { canonical: siteUrl("/support/") },
  openGraph: {
    images: [siteUrl("/og.png")],
    title: "UAT Pocket — Support",
    url: siteUrl("/support/"),
  },
};
export default function Support() {
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const phone = process.env.NEXT_PUBLIC_SUPPORT_PHONE;
  const security = process.env.NEXT_PUBLIC_SECURITY_EMAIL;
  return (
    <main id="main" className="container">
      <div className="document-heading">
        <span className="eyebrow">UAT POCKET SUPPORT</span>
        <h1>How can we help?</h1>
        <p className="lead">
          Find a next step, get help with your workflow, or reach out to the
          team.
        </p>
      </div>
      <div className="support-layout">
        <div>
          <SupportTopics />
          <div className="actions">
            <a href={sitePath("/privacy")}>Privacy Policy</a>
            <a href="#account-deletion">Account deletion</a>
            <a href="#permissions">Permissions help</a>
            <a href="#sign-in">Sign-in troubleshooting</a>
          </div>
        </div>
        <div>
          <section className="contact-card">
            <h2>Talk to the team</h2>
            <p>
              {email ? (
                <a href={`mailto:${email}`}>{email}</a>
              ) : (
                "[SUPPORT EMAIL]"
              )}
            </p>
            <p>
              {phone === "none" ? (
                ""
              ) : phone ? (
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
              ) : (
                "[SUPPORT PHONE, IF USED]"
              )}
            </p>
            <p>
              Security or urgent privacy concern:
              <br />
              {security ? (
                <a href={`mailto:${security}`}>{security}</a>
              ) : (
                "[SECURITY CONTACT EMAIL]"
              )}
            </p>
            {!email && (
              <p>
                Contact details are being finalized for the pilot. Preview forms
                do not deliver requests.
              </p>
            )}
          </section>
          <section id="support-form" aria-label="Support request">
            <ContactForm kind="support" />
          </section>
        </div>
      </div>
    </main>
  );
}
