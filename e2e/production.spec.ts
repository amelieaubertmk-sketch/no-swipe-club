import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("le véritable artefact Pages charge React, ses assets et les routes internes", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  const assets: { url: string; status: number; type: string }[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("requestfailed", (r) => errors.push(r.url()));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
    if (r.url().includes("/assets/"))
      assets.push({
        url: r.url(),
        status: r.status(),
        type: r.headers()["content-type"] || "",
      });
  });
  await page.goto("./");
  await expect(page.getByRole("heading", { name: /NO SWIPE/ })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect(assets.some((a) => a.type.startsWith("text/javascript"))).toBe(true);
  expect(assets.some((a) => a.type.startsWith("text/css"))).toBe(true);
  expect(assets.some((a) => a.type.startsWith("font/"))).toBe(true);
  for (const a of assets) {
    expect(new URL(a.url).pathname).toMatch(/^\/no-swipe-club\/assets\//);
    expect(a.status).toBe(200);
  }
  await page.goto("./#/confidentialite");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Tes données. Tes choix." }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  // A real static server must not turn a missing asset into an HTML SPA fallback.
  expect((await request.get("./assets/missing.js")).status()).toBe(404);
  const html = await readFile("dist/index.html", "utf8");
  expect(html).not.toContain("/src/main.tsx");
  expect(await readFile("index.html", "utf8")).toBe(html);
  expect(html).not.toContain("@vite/client");
  const js = html.match(/<script[^>]+src="([^"]+)"/g) || [];
  expect(js.length).toBeGreaterThan(0);
  for (const script of js) expect(script).toContain("/no-swipe-club/assets/");
});

test("un bundle introuvable affiche un message explicite plutôt qu’une page blanche", async ({
  page,
}) => {
  await page.route("**/assets/*.js", (route) => route.abort());
  await page.goto("./");
  await expect(page.getByText(/Le chargement a échoué/)).toBeVisible();
});
