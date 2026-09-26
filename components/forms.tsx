"use client";
import { sitePath } from "@/lib/urls";
import { useRef, useState, type FormEvent } from "react";
export function ContactForm({ kind }: { kind: "early" | "support" }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const endpoint =
    kind === "early"
      ? process.env.NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT
      : process.env.NEXT_PUBLIC_SUPPORT_ENDPOINT;
  const fields =
    kind === "early"
      ? [
          ["email", "Work email", "email", true],
          ["name", "Name", "text", true],
          ["organisation", "Organisation", "text", true],
          ["role", "Role", "select", true],
          ["message", "Message (optional)", "textarea", false],
        ]
      : [
          ["name", "Name", "text", true],
          ["email", "Email", "email", true],
          ["topic", "Topic", "select", true],
          ["message", "Message", "textarea", true],
          ["version", "App version / build (optional)", "text", false],
        ];
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const next: Record<string, string> = {};
    for (const [name, label, type, required] of fields) {
      const value = String(data[String(name)] || "").trim();
      if (required && !value)
        next[String(name)] = `Please enter ${String(label).toLowerCase()}.`;
      else if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        next[String(name)] = "Enter a valid email address.";
    }
    if (data.privacy !== "on")
      next.privacy = "Please acknowledge the Privacy Policy.";
    setErrors(next);
    setStatus("");
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    if (!endpoint) {
      setStatus(
        "Preview only: your form is valid, but nothing was sent or stored. Contact details and delivery will be available when the pilot opens.",
      );
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error();
      setStatus("Thank you. Your request was delivered successfully.");
      formRef.current?.reset();
    } catch {
      setStatus(
        "We could not deliver your request. Your entries are still here. Please try again or use the contact information on our Support page.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form ref={formRef} className="contact-form" onSubmit={submit} noValidate>
      <h3>
        {kind === "early" ? "Be part of the pilot." : "Send a support request"}
      </h3>
      <p className="form-note">
        {endpoint
          ? "Required fields are marked with *."
          : "Preview form — delivery is not configured. Nothing will be sent or stored."}
      </p>
      <div className="form-grid">
        {fields.map(([n, l, t, required]) => {
          const name = String(n),
            type = String(t);
          const common = {
            id: `${kind}-${name}`,
            name,
            required: Boolean(required),
            "aria-invalid": Boolean(errors[name]),
            "aria-describedby": errors[name]
              ? `${kind}-${name}-error`
              : undefined,
          };
          return (
            <div
              className={`field ${type === "textarea" ? "full" : ""}`}
              key={name}
            >
              <label htmlFor={common.id}>
                {String(l)}
                {required ? " *" : ""}
              </label>
              {type === "textarea" ? (
                <textarea {...common} rows={3} maxLength={5000} />
              ) : type === "select" ? (
                <select {...common} defaultValue="">
                  <option value="" disabled>
                    Select {name}
                  </option>
                  {(name === "role"
                    ? [
                        "Business tester",
                        "Business analyst",
                        "Project manager / UAT coordinator",
                        "Vendor team",
                        "Other",
                      ]
                    : [
                        "Sign-in",
                        "Projects",
                        "Evidence and voice",
                        "AI draft review",
                        "Vendor workflow",
                        "Retest",
                        "Notifications",
                        "Account deletion",
                        "Privacy or security",
                        "Other",
                      ]
                  ).map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              ) : (
                <input
                  {...common}
                  type={type}
                  autoComplete={
                    name === "name"
                      ? "name"
                      : name === "email"
                        ? "email"
                        : name === "organisation"
                          ? "organization"
                          : "off"
                  }
                  maxLength={254}
                />
              )}
              <span className="field-error" id={`${kind}-${name}-error`}>
                {errors[name]}
              </span>
            </div>
          );
        })}
      </div>
      <div className="acknowledgement">
        <input
          type="checkbox"
          id={`${kind}-privacy`}
          name="privacy"
          required
          aria-invalid={Boolean(errors.privacy)}
          aria-describedby={`${kind}-privacy-error`}
        />
        <label htmlFor={`${kind}-privacy`}>
          I acknowledge the <a href={sitePath("/privacy")}>Privacy Policy</a>{" "}
          and the use of my details to respond to this request. *
        </label>
      </div>
      <span className="field-error" id={`${kind}-privacy-error`}>
        {errors.privacy}
      </span>
      <button className="button" type="submit" disabled={busy}>
        {busy
          ? "Sending…"
          : kind === "early"
            ? "Request Early Access"
            : "Send support request"}
      </button>
      <p role="status" aria-live="polite" className="form-status">
        {status}
      </p>
    </form>
  );
}
