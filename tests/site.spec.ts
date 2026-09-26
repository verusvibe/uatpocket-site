import { sitePath } from "../lib/urls";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [320, 390, 768, 1024, 1440])
  for (const route of ["/", "/product/", "/privacy/", "/support/"])
    test(`${route} at ${width}px: layout, images and accessibility`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(sitePath(route));
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("main")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.forEach(
            (image) => ((image as HTMLImageElement).loading = "eager"),
          ),
        );
      await page.waitForFunction(() =>
        Array.from(document.images).every(
          (image) => image.complete && image.naturalWidth > 0,
        ),
      );
      await page.screenshot({
        path: `test-results/${route.replaceAll("/", "") || "home"}-${width}.png`,
        fullPage: true,
      });
    });
test("mobile menu keyboard and Escape behavior", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(sitePath("/"));
  const button = page.getByRole("button", { name: "Open menu" });
  await button.click();
  await expect(page.locator("#primary-nav a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await expect(page.locator("#primary-nav")).toBeHidden();
});
test("early access validates and honestly reports undelivered preview", async ({
  page,
}) => {
  await page.goto(sitePath("/#early-access"));
  const form = page.locator("form");
  await form.getByRole("button", { name: "Request Early Access" }).click();
  await expect(form.getByLabel("Work email")).toBeFocused();
  await form.getByLabel("Work email").fill("tester@example.com");
  await form.getByLabel("Name", { exact: false }).fill("Test User");
  await form.getByLabel("Organisation").fill("Test organisation");
  await form.getByLabel("Role").selectOption("Business tester");
  await form.getByLabel("I acknowledge").check();
  await form.getByRole("button", { name: "Request Early Access" }).click();
  await expect(form.getByRole("status")).toContainText(
    "nothing was sent or stored",
  );
});
test("support search, empty result and request validation", async ({
  page,
}) => {
  await page.goto(sitePath("/support/"));
  await page.getByLabel("Search support topics").fill("transcript");
  await expect(page.locator("details")).toHaveCount(1);
  await page.getByLabel("Search support topics").fill("zzzzzzzz");
  await expect(page.getByText("No matching topics.")).toBeVisible();
  await page.getByLabel("Search support topics").fill("");
  await page.getByRole("button", { name: "Send support request" }).click();
  await expect(page.getByLabel("Name *", { exact: true })).toBeFocused();
});
test("internal links and local assets resolve", async ({ page, request }) => {
  const urls = new Set<string>();
  for (const route of ["/", "/product/", "/privacy/", "/support/"]) {
    await page.goto(sitePath(route));
    const links = await page
      .locator('a[href^="/"],img[src^="/"]')
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute("href") || n.getAttribute("src") || ""),
      );
    for (const link of links) {
      if (process.env.NEXT_PUBLIC_BASE_PATH)
        expect(link).toMatch(
          new RegExp(`^${process.env.NEXT_PUBLIC_BASE_PATH}/`),
        );
      urls.add(link.split("#")[0] || sitePath("/"));
    }
  }
  for (const url of urls) {
    const response = await request.get(url);
    expect(response.ok(), url).toBeTruthy();
  }
});
test("product print hides navigation and fits both paper formats", async ({
  page,
}) => {
  await page.goto(sitePath("/product/"));
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("header")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Print / Save as PDF" }),
  ).toBeHidden();
  for (const format of ["A4", "Letter"] as const)
    await page.pdf({
      path: `test-results/product-${format}.pdf`,
      format,
      printBackground: false,
    });
});

test("metadata retains the repository subpath", async ({ page, request }) => {
  for (const route of ["/", "/product/", "/privacy/", "/support/"]) {
    await page.goto(sitePath(route));
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(sitePath(route));
    const image = await page
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute("content");
    expect(new URL(image!).pathname).toBe(sitePath("/og.png"));
    expect((await request.get(sitePath("/og.png"))).ok()).toBeTruthy();
  }
});
