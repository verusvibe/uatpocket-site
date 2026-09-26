import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const required = [
  "LEGAL_ENTITY",
  "COPYRIGHT_OWNER",
  "CONTACT_EMAIL",
  "SUPPORT_EMAIL",
  "SUPPORT_PHONE",
  "SECURITY_EMAIL",
  "EFFECTIVE_DATE",
  "RETENTION_POLICY",
  "PROCESSING_REGIONS",
  "SERVICE_PROVIDER_DETAILS",
  "AI_PROCESSING_TERMS",
  "LEGAL_BASES",
  "SITE_URL",
  "EARLY_ACCESS_ENDPOINT",
  "SUPPORT_ENDPOINT",
];
const missing = required.filter(
  (key) =>
    !process.env[`NEXT_PUBLIC_${key}`] ||
    /\[.+\]/.test(process.env[`NEXT_PUBLIC_${key}`]),
);
const invalid = [];
for (const key of ["SITE_URL", "EARLY_ACCESS_ENDPOINT", "SUPPORT_ENDPOINT"]) {
  const value = process.env[`NEXT_PUBLIC_${key}`];
  if (value) {
    try {
      const u = new URL(value);
      if (
        u.protocol !== "https:" ||
        u.hostname === "localhost" ||
        u.hostname.endsWith(".invalid")
      )
        invalid.push(key);
    } catch {
      invalid.push(key);
    }
  }
}
for (const key of ["CONTACT_EMAIL", "SUPPORT_EMAIL", "SECURITY_EMAIL"]) {
  const value = process.env[`NEXT_PUBLIC_${key}`];
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) invalid.push(key);
}
const phone = process.env.NEXT_PUBLIC_SUPPORT_PHONE;
if (phone && phone !== "none" && !/^\+?[\d\s().-]{7,25}$/.test(phone))
  invalid.push("SUPPORT_PHONE");
const origin = process.env.NEXT_PUBLIC_SITE_URL;
if (origin) {
  try {
    const url = new URL(origin);
    if (url.pathname !== "/" || url.search || url.hash)
      invalid.push(
        "SITE_URL (must be an origin; use BASE_PATH for the repository path)",
      );
  } catch {}
}
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
if (basePath && !/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(basePath))
  invalid.push("BASE_PATH");
if (missing.length || invalid.length) {
  console.error(
    "LAUNCH BLOCKED — unresolved owner-supplied values.\n" +
      missing.map((x) => `  Missing: NEXT_PUBLIC_${x}`).join("\n") +
      "\n" +
      invalid.map((x) => `  Invalid: NEXT_PUBLIC_${x}`).join("\n") +
      "\nUse npm run build:preview only for local verification. Preview output is not approved for publishing.",
  );
  process.exit(1);
}
console.log("Launch configuration checks passed.");
