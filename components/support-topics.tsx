"use client";
import { sitePath } from "@/lib/urls";
import { useState } from "react";
const topics = [
  [
    "sign-in",
    "Signing in and resetting a password",
    "Use the sign-in method associated with your account. For an email/password account, use the password-reset option and check your inbox and spam folder. If you signed in with Apple, use that same method. Never share a password or one-time code with support.",
  ],
  [
    "projects",
    "Creating or joining a project",
    "Sign in to view your projects. Use Add Project to create a project, or ask your project owner to arrange membership. Membership is required to access project data; contact the owner if an expected project is missing.",
  ],
  [
    "permissions",
    "Adding photo evidence",
    "In capture, use the camera or select photos from your library. Review your evidence before adding it; an issue supports up to five images. If camera access is disabled, review UAT Pocket permissions in your device Settings. Selected-photo access lets you choose which images to share.",
  ],
  [
    "voice",
    "Recording and editing a voice transcript",
    "Record a spoken observation, stop recording, then review and edit the transcript. Check microphone and speech permissions in device Settings if recording or transcription is unavailable. You can add a typed note instead.",
  ],
  [
    "ai-review",
    "Reviewing an AI-assisted draft",
    "AI assistance is optional. Review the evidence and disclosure before generation. Check the title, description, expected and actual results, severity, category and follow-up questions. Edit anything that needs correction, then explicitly choose Submit Issue. If generation is unavailable, continue manually.",
  ],
  [
    "vendor",
    "Vendor investigation and clarification",
    "Project vendor users can review evidence, comment, start investigation and request clarification. When a fix is ready, provide a fix description and build number and mark Fix Ready to return the issue for customer retest.",
  ],
  [
    "retest",
    "Starting and completing a retest",
    "Review the original issue and vendor fix/build details, then start retest. Add retest evidence and record the outcome. Pass and close a verified fix, or reopen an unsuccessful fix for further investigation. Connectivity may be needed for critical status changes.",
  ],
  [
    "notifications",
    "Managing notifications",
    "Review notification permissions for UAT Pocket in your device Settings. Notifications support assignments, clarification, fix-ready and retest actions. Open the app to review current project and issue activity if a notification is missing.",
  ],
  [
    "account-deletion",
    "Requesting account deletion",
    "Select Account deletion in the support form and provide your account email. Do not include your password. Identity verification may be required. Shared lifecycle history and other records may be retained according to the final retention policy; read the Privacy Policy for the current details.",
  ],
  [
    "security",
    "Reporting a privacy or security concern",
    "Use the dedicated security contact shown on this page when configured, or select Privacy or security in the support form. Describe the concern without including passwords, access tokens, sensitive defect evidence or unnecessary personal information.",
  ],
];
export function SupportTopics() {
  const [query, setQuery] = useState("");
  const visible = topics.filter((x) =>
    x.join(" ").toLowerCase().includes(query.toLowerCase().trim()),
  );
  return (
    <div className="help-topics">
      <label className="search-label" htmlFor="support-search">
        Search support topics
      </label>
      <input
        id="support-search"
        className="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try evidence, sign-in, or retest…"
      />
      <p role="status">
        {visible.length} {visible.length === 1 ? "topic" : "topics"} found
      </p>
      {visible.map(([id, title, body]) => (
        <details id={id} key={id}>
          <summary>
            {title}
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            {body}
            {id === "account-deletion" && (
              <>
                {" "}
                <a href={sitePath("/privacy#retention")}>
                  Read the retention policy.
                </a>
              </>
            )}
          </p>
        </details>
      ))}
      {visible.length === 0 && (
        <p>
          No matching topics. Try a different phrase or send a support request.
        </p>
      )}
    </div>
  );
}
