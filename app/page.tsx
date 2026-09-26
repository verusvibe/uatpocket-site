import { sitePath } from "@/lib/urls";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Mic,
  ShieldCheck,
  Users,
  ClipboardCheck,
  Layers,
  Wrench,
} from "lucide-react";
import { Button, Screenshot, Checks } from "@/components/site";
export default function Home() {
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span />
            Mobile UAT, from evidence to verified closure
          </span>
          <h1>
            Capture UAT defects <em>while they happen.</em>
          </h1>
          <p className="lead">
            Take a photo, describe what went wrong, review a clear issue draft,
            and keep every fix and retest connected until the defect is verified
            and closed.
          </p>
          <div className="actions">
            <Button href="#early-access">Request Early Access</Button>
            <a className="text-link" href="#workflow">
              See how it works <ArrowRight size={18} />
            </a>
          </div>
          <p className="trust-line">
            Photo-first · Voice-assisted · Human-reviewed AI
            <br />
            Built for UAT teams
          </p>
        </div>
        <div className="hero-visual">
          <div className="hero-shot">
            <Screenshot number={1} hero />
          </div>
          <span className="floating-chip chip-top">
            <Camera size={19} />
            <span>
              Evidence attached<small>Context, captured.</small>
            </span>
          </span>
          <span className="floating-chip chip-bottom">
            <CheckCircle2 size={20} />
            <span>
              Ready for retest<small>A clear next step.</small>
            </span>
          </span>
        </div>
      </section>
      <div className="promise-band">
        <div className="container">
          <span>LESS REPORTING FRICTION.</span>
          <p>
            More context. Clear ownership. <strong>Verified closure.</strong>
          </p>
          <ShieldCheck aria-hidden="true" />
        </div>
      </div>
      <section id="product" className="section container">
        <span className="eyebrow">FROM SCATTERED TO CONNECTED</span>
        <h2>
          Stop rebuilding the
          <br />
          defect report later.
        </h2>
        <p className="section-intro">
          Screenshots on a phone, notes in another app, trackers in
          spreadsheets, and updates buried in email create incomplete reports
          and slow clarification cycles. UAT Pocket keeps the evidence, issue
          details, ownership, vendor response, and retest history together.
        </p>
        <div className="comparison">
          <article className="card before">
            <span className="card-label">THE OLD ROUTINE</span>
            <h3>Before UAT Pocket</h3>
            <ul>
              {[
                "Evidence separated from the issue.",
                "Defects rewritten after the test session.",
                "Multiple spreadsheet versions shared by email.",
                "Unclear ownership and missing fix context.",
                "Retest results disconnected from the original report.",
              ].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
          <article className="card after">
            <span className="card-label">A CONNECTED WORKFLOW</span>
            <h3>With UAT Pocket</h3>
            <Checks
              items={[
                "Capture evidence at the moment of discovery.",
                "Turn observations into a structured, editable issue.",
                "Keep customer and vendor actions in one lifecycle.",
                "Record fix descriptions and build numbers.",
                "Verify the result with retest evidence before closure.",
              ]}
            />
          </article>
        </div>
      </section>
      <section id="workflow" className="section lavender">
        <div className="container">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>
            One connected path from
            <br />
            “something is wrong”
            <br className="mobile-break" /> to verified closure.
          </h2>
          <ol className="timeline">
            {[
              ["See it", "Notice unexpected behavior during UAT."],
              [
                "Capture it",
                "Add a photo or screenshot, voice observation, and quick note.",
              ],
              [
                "Draft it",
                "Create the issue manually or generate an AI-assisted draft.",
              ],
              [
                "Review it",
                "Edit the fields and confirm the evidence before submission.",
              ],
              [
                "Submit it",
                "Assign the issue and preserve its lifecycle history.",
              ],
              [
                "Fix it",
                "Let the vendor investigate, clarify, and provide fix/build details.",
              ],
              [
                "Retest it",
                "Review the original issue and add retest evidence.",
              ],
              [
                "Close it",
                "Pass and close, or reopen for further investigation.",
              ],
            ].map(([title, body], i) => (
              <li key={title}>
                <span className="step-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <p className="workflow-note">
            <CheckCircle2 size={18} /> Every draft is reviewed by a person.
            Every closure follows a retest.
          </p>
        </div>
      </section>
      <section className="section container stories">
        <article className="story">
          <div
            className="story-images paired"
            tabIndex={0}
            role="region"
            aria-label="Capture screenshots, scroll horizontally on small screens"
          >
            <Screenshot number={1} />
            <Screenshot number={2} />
          </div>
          <div className="story-copy">
            <span className="feature-icon">
              <Camera />
            </span>
            <span className="eyebrow">01 / CAPTURE</span>
            <h2>
              Capture evidence
              <br />
              in the moment.
            </h2>
            <p>
              Take a photo or attach a screenshot while you test. Add a quick
              note, record a spoken observation, and review the transcript
              before it becomes part of the issue.
            </p>
            <Checks
              items={[
                "Camera and selected photo-library evidence.",
                "Up to five images per issue.",
                "Voice recording and editable transcription.",
                "Local draft preservation when work is interrupted.",
              ]}
            />
          </div>
        </article>
        <article className="story reverse">
          <div className="story-images single">
            <Screenshot number={3} />
            <span className="image-caption">
              <CheckCircle2 size={18} /> Draft reviewed. Ready for your
              decision.
            </span>
          </div>
          <div className="story-copy">
            <span className="feature-icon">
              <ClipboardCheck />
            </span>
            <span className="eyebrow">02 / REVIEW</span>
            <h2>
              Get structure.
              <br />
              Keep control.
            </h2>
            <p>
              Use optional AI assistance to turn evidence and context into an
              editable UAT draft. Review the title, description, expected and
              actual results, severity, category, and follow-up questions before
              you submit.
            </p>
            <div className="callout">
              AI assists. You decide what gets submitted.
            </div>
            <p className="small-copy">
              Choose <strong>Submit Issue</strong> when you’re ready. Manual
              creation remains available if AI is disabled or unavailable.
            </p>
          </div>
        </article>
        <article className="story">
          <div className="story-images single">
            <Screenshot number={4} />
          </div>
          <div className="story-copy">
            <span className="feature-icon">
              <Layers />
            </span>
            <span className="eyebrow">03 / COORDINATE</span>
            <h2>
              Keep projects and
              <br />
              ownership visible.
            </h2>
            <p>
              See project status, issue counts, ownership, environment, members,
              and recent activity without assembling another tracker.
            </p>
            <div className="status-list">
              {["Open", "In Progress", "Fixed", "Retest", "Closed"].map(
                (s, i) => (
                  <span className={`status status-${i}`} key={s}>
                    {s}
                  </span>
                ),
              )}
            </div>
            <p className="small-copy">
              A shared view of what needs attention, who owns the next action,
              and what’s ready to verify.
            </p>
          </div>
        </article>
        <article className="story reverse">
          <div
            className="story-images paired"
            tabIndex={0}
            role="region"
            aria-label="Fix and retest screenshots, scroll horizontally on small screens"
          >
            <Screenshot number={5} />
            <Screenshot number={6} />
          </div>
          <div className="story-copy">
            <span className="feature-icon">
              <CheckCircle2 />
            </span>
            <span className="eyebrow">04 / VERIFY</span>
            <h2>
              A fix isn’t finished
              <br />
              until it’s verified.
            </h2>
            <p>
              Vendors can investigate, request clarification, record fix
              details, and mark an issue ready for retest. Testers can review
              the original evidence, add retest evidence, then pass and close or
              reopen the issue.
            </p>
            <Checks
              items={[
                "Fix descriptions and build numbers stay with the issue.",
                "Original and retest evidence remain connected.",
                "Pass and close, or reopen with a clear next action.",
              ]}
            />
          </div>
        </article>
      </section>
      <section id="teams" className="section soft">
        <div className="container">
          <span className="eyebrow">BUILT FOR THE WHOLE UAT TEAM</span>
          <h2>
            Different roles.
            <br />
            One shared path forward.
          </h2>
          <div className="team-grid">
            {[
              [
                Camera,
                "Business tester",
                "Capture evidence and submit clearer defects with less typing.",
              ],
              [
                ClipboardCheck,
                "Business analyst",
                "Review quality, clarification, ownership, and lifecycle history.",
              ],
              [
                Users,
                "Project manager",
                "Track blockers, assignments, project health, and retest readiness.",
              ],
              [
                Wrench,
                "Vendor team",
                "Investigate, comment, provide fix/build details, and hand work back for retest.",
              ],
            ].map(([Icon, title, body]) => {
              const I = Icon as typeof Camera;
              return (
                <article className="card role-card" key={String(title)}>
                  <I aria-hidden="true" />
                  <h3>{String(title)}</h3>
                  <p>{String(body)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section container one-pager-preview">
        <div>
          <span className="eyebrow">PRODUCT ONE-PAGER</span>
          <h2>
            The whole picture.
            <br />
            Ready to share.
          </h2>
          <p>
            A concise look at the problem, the workflow, and the outcome we’re
            building for.
          </p>
          <Button href={sitePath("/product")} secondary>
            View Product One-Pager
          </Button>
        </div>
        <div className="north-star">
          <span className="eyebrow">OUR NORTH STAR</span>
          <CheckCircle2 size={36} />
          <h3>
            Verified UAT defects completed through the full capture-to-retest
            lifecycle.
          </h3>
          <p>Capture → Fix → Retest → Verified closure</p>
        </div>
      </section>
      <section className="section container security">
        <ShieldCheck size={40} />
        <span className="eyebrow">PRIVACY & CONTROL</span>
        <h2>
          Project collaboration with
          <br />
          privacy and control built in.
        </h2>
        <p className="section-intro">
          Our architectural principles keep project context and human decisions
          at the center.
        </p>
        <Checks
          items={[
            "Project membership is the primary access boundary.",
            "Evidence is stored in private cloud storage paths.",
            "Role-aware workflows separate customer and vendor actions.",
            "Important lifecycle changes are retained as an issue history.",
            "Analytics must not include sensitive defect content.",
            "AI-assisted content requires review before submission.",
          ]}
        />
        <a className="text-link" href={sitePath("/privacy")}>
          Read our Privacy Policy <ArrowRight size={18} />
        </a>
      </section>
      <EarlyAccess />
      <section className="section container faq">
        <span className="eyebrow">A FEW THINGS TO KNOW</span>
        <h2>Questions, answered.</h2>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
import { ContactForm } from "@/components/forms";
function EarlyAccess() {
  return (
    <section id="early-access" className="early-access">
      <div className="container early-grid">
        <div>
          <span className="eyebrow">LET’S MAKE UAT FEEL LIGHTER</span>
          <h2>Bring your next UAT cycle out of the spreadsheet loop.</h2>
          <p>
            Join the UAT Pocket pilot and help shape a faster path from defect
            capture to verified closure.
          </p>
          <div className="cta-icons">
            <Camera />
            <Mic />
            <CheckCircle2 />
          </div>
        </div>
        <ContactForm kind="early" />
      </div>
    </section>
  );
}
const faqs = [
  [
    "Is UAT Pocket a Jira replacement?",
    "No. UAT Pocket is a mobile system of engagement for UAT capture and completion. A downstream system may remain the formal system of record.",
  ],
  [
    "Does AI submit issues automatically?",
    "No. AI can prepare an editable draft, but the user must review it and explicitly submit the issue. Manual creation remains available.",
  ],
  [
    "Can vendors participate?",
    "Yes. Vendor users can review evidence, comment, investigate, request clarification, provide fix/build information, and mark work ready for retest according to their project role.",
  ],
  [
    "Can testers reopen a failed fix?",
    "Yes. During retest, the tester can pass and close the issue or reopen it with new evidence and return ownership for further investigation.",
  ],
  [
    "Does it work offline?",
    "The MVP supports modest offline behavior such as cached data and local unsent capture drafts. AI generation, submission, and critical status transitions may require connectivity.",
  ],
  [
    "How is project data protected?",
    "Access is based on authenticated project membership and role-aware server rules. Evidence is stored privately and sensitive issue content is excluded from analytics parameters.",
  ],
];
