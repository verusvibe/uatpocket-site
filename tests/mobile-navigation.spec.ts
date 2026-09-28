import { test, expect } from "@playwright/test";
import { sitePath } from "../lib/urls";
for (const [name, path] of [
  ["Privacy", "/privacy/"],
  ["Support", "/support/"],
  ["View Product One-Pager", "/product/"],
]) {
  test(`touch follows ${name}`, async ({ page }) => {
    await page.goto(sitePath("/"));
    await page.getByRole("button", { name: "Open menu" }).tap();
    await page
      .locator("#primary-nav")
      .getByRole("link", { name, exact: true })
      .tap();
    await expect(page).toHaveURL(new RegExp(`${sitePath(path)}$`));
    await expect(page.locator("main h1")).toBeVisible();
  });
}
test("touch follows home sections and closes the menu", async ({ page }) => {
  await page.goto(sitePath("/"));
  await page.getByRole("button", { name: "Open menu" }).tap();
  await page
    .locator("#primary-nav")
    .getByRole("link", { name: "How It Works", exact: true })
    .tap();
  await expect(page).toHaveURL(new RegExp(`${sitePath("/")}#workflow$`));
  await expect(page.locator("#primary-nav")).toBeHidden();
});
test("outside touch dismisses menu", async ({ page }) => {
  await page.goto(sitePath("/"));
  await page.getByRole("button", { name: "Open menu" }).tap();
  await page.locator("main").tap({ position: { x: 10, y: 650 } });
  await expect(page.locator("#primary-nav")).toBeHidden();
});
