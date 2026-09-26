import { sitePath, siteUrl } from "@/lib/urls";
import type { Metadata } from "next";
import { Screenshot } from "@/components/site";
import { PrintButton } from "@/components/print-button";
export const metadata: Metadata = {
  title: "Product One-Pager",
  alternates: { canonical: siteUrl("/product/") },
  openGraph: {
    images: [siteUrl("/og.png")],
    title: "UAT Pocket — Product One-Pager",
    url: siteUrl("/product/"),
  },
};
const metrics = [
  "Median issue capture time.",
  "Evidence completeness rate.",
  "First-pass vendor acceptance rate.",
  "Vendor turnaround time.",
  "Retest turnaround time.",
  "Reopen rate.",
  "Mobile capture rate.",
  "Reduction in spreadsheet dependency.",
];
const capabilities = [
  "Authentication and project membership.",
  "Project dashboards and role-aware access.",
  "Manual issue creation.",
  "Camera/photo evidence and voice transcription.",
  "Optional AI-assisted drafts with mandatory human review.",
  "Issue list, detail, comments, ownership, and lifecycle history.",
  "Vendor investigation, clarification, and Fix Ready workflow.",
  "Retest evidence, pass/close, and reopen.",
  "In-app and push notifications.",
  "Firebase-backed security, analytics, and operational monitoring.",
];
const principles = [
  "Mobile-first, photo-first, and voice-assisted.",
  "Manual creation remains first class.",
  "AI never submits automatically.",
  "Project membership is the main security boundary.",
  "Important lifecycle events remain part of an immutable history.",
  "Optimize for verified closure, not activity volume.",
];
export default function Product() {
  return (
    <main id="main" className="container onepager">
      <div className="document-heading">
        <span className="eyebrow">PRODUCT ONE-PAGER</span>
        <h1>UAT Pocket</h1>
        <p className="lead">
          Mobile defect capture and completion for User Acceptance Testing
          teams.
        </p>
        <PrintButton />
      </div>
      <div className="onepager-grid">
        <section>
          <h2>Core promise</h2>
          <p>
            Make UAT defect capture as easy as taking a photo—and carry every
            accepted issue through fix, retest, and verified closure.
          </p>
        </section>
        <section>
          <h2>Primary users</h2>
          <p>
            Business testers, business analysts, project managers/UAT
            coordinators, and vendor users.
          </p>
        </section>
        <section>
          <h2>Problem</h2>
          <p>
            UAT evidence, notes, spreadsheets, emails, ownership, and retest
            results are often split across tools. This delays reporting, creates
            incomplete issues, increases clarification cycles, and fragments the
            history needed to verify a fix.
          </p>
        </section>
        <section>
          <h2>Solution</h2>
          <p>
            UAT Pocket keeps evidence, structured issue details, customer and
            vendor actions, fix/build information, retest evidence, reopen
            history, and closure together in a mobile-first workflow.
          </p>
        </section>
      </div>
      <div className="golden-workflow">
        <span className="eyebrow">GOLDEN WORKFLOW</span>Capture → Draft → Review
        → Submit → Investigate → Fix Ready → Retest → Close or Reopen
      </div>
      <section className="north-star">
        <div>
          <span className="eyebrow">NORTH STAR METRIC</span>
          <h2>
            Verified UAT defects completed through the full capture-to-retest
            lifecycle
          </h2>
          <p>
            An issue qualifies when it progresses through capture, submission,
            assignment, fix, retest, and verified closure in UAT Pocket.
          </p>
          <p>
            It measures completed UAT outcomes rather than shallow activity. App
            opens, screenshots, created issues, AI prompts, and daily active
            users do not prove that a defect was fixed and verified.
          </p>
        </div>
        <Screenshot number={6} />
      </section>
      <div className="onepager-grid">
        <section>
          <h2>MVP capabilities</h2>
          <ul>
            {capabilities.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Supporting metrics</h2>
          <ul>
            {metrics.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p>
            These are the measures we’re building toward; no production results
            are claimed.
          </p>
        </section>
        <section>
          <h2>Product principles</h2>
          <ul>
            {principles.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Start the conversation</h2>
          <p>
            <a href={sitePath("/#early-access")}>Request Early Access</a>
          </p>
          <p>
            <a href={sitePath("/support")}>Support</a> ·{" "}
            <a href={sitePath("/privacy")}>Privacy Policy</a>
          </p>
          <p>Capture clearly. Fix confidently. Verify before closing.</p>
        </section>
      </div>
    </main>
  );
}
