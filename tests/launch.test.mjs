import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
const script = resolve("scripts/check-launch.mjs");
const fixture = {
  LEGAL_ENTITY: "Test operator",
  COPYRIGHT_OWNER: "Test operator",
  CONTACT_EMAIL: "privacy@example.com",
  SUPPORT_EMAIL: "support@example.com",
  SUPPORT_PHONE: "none",
  SECURITY_EMAIL: "security@example.com",
  EFFECTIVE_DATE: "2026-09-26",
  RETENTION_POLICY: "Test retention policy",
  PROCESSING_REGIONS: "Test regions",
  SERVICE_PROVIDER_DETAILS: "Test providers",
  AI_PROCESSING_TERMS: "Test AI terms",
  LEGAL_BASES: "Test legal bases",
  SITE_URL: "https://verusvibe.github.io",
  BASE_PATH: "/uatpocket-site",
  EARLY_ACCESS_ENDPOINT: "https://example.com/early",
  SUPPORT_ENDPOINT: "https://example.com/support",
};
function check(overrides = {}) {
  const cwd = mkdtempSync(join(tmpdir(), "uat-launch-test-"));
  const env = Object.fromEntries(
    Object.entries(process.env).filter(
      ([key]) => !key.startsWith("NEXT_PUBLIC_"),
    ),
  );
  for (const [key, value] of Object.entries({ ...fixture, ...overrides }))
    env[`NEXT_PUBLIC_${key}`] = value;
  try {
    return spawnSync(process.execPath, [script], {
      cwd,
      env,
      encoding: "utf8",
    });
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
}
test("complete configuration accepts no telephone support or a real phone number", () => {
  for (const phone of ["none", "+65 6123 4567"]) {
    const result = check({ SUPPORT_PHONE: phone });
    assert.equal(result.status, 0, result.stderr);
  }
});
test("missing values and unresolved placeholders block publishing", () => {
  for (const value of ["", "[LEGAL ENTITY]"]) {
    const result = check({ LEGAL_ENTITY: value });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /LEGAL_ENTITY/);
  }
});
test("invalid endpoint, phone and site paths block publishing", () => {
  for (const override of [
    { EARLY_ACCESS_ENDPOINT: "http://example.com/form" },
    { SUPPORT_PHONE: "phone@example.com" },
    { SITE_URL: "https://verusvibe.github.io/uatpocket-site/" },
    { BASE_PATH: "/uatpocket-site/" },
  ])
    assert.equal(check(override).status, 1);
});
