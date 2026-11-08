import { test, expect } from "@playwright/test";
async function diagnostic(
  page: import("@playwright/test").Page,
  consent = true,
) {
  await page.goto("./#/diagnostic");
  const answers = [
    "28–30",
    "Récemment séparé·e",
    "Reconstruction personnelle",
    "Oui",
    "2",
    "Retrouver confiance",
    "Pas pour moi",
    "Lecture",
    null,
    "Gratuit uniquement",
    "Le week-end",
    "Petit groupe",
    "Doux",
    "La confiance",
    consent ? "Oui, sur cet appareil" : "Non, pour cette session",
  ];
  for (const answer of answers) {
    if (answer) await page.getByText(answer, { exact: true }).click();
    await page
      .getByRole("button", {
        name: /Continuer|Passer cette question|Découvrir mon plan/,
      })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: /Un nouvel élan/ }),
  ).toBeVisible();
  await page.getByRole("link", { name: "C’est parti pour mon jour 1" }).click();
}
test("parcours mobile, reprise, activités, simulation, bilan et suppression", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await page.screenshot({ path: "/tmp/nsc-mobile.png", fullPage: true });
  await expect(page.getByRole("heading", { name: /NO SWIPE/ })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await diagnostic(page);
  await page.getByRole("link", { name: "Découvrir ma mission" }).click();
  await page.getByRole("button", { name: "Marquer comme terminée" }).click();
  await page.reload();
  await expect(
    page.getByText("Mission terminée. Tu peux changer d’avis."),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explorer", exact: true }).click();
  await expect(
    page.getByText(
      "Suggestions d’activités à rechercher près de chez toi — événements non vérifiés.",
    ),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "J’ai exploré cette piste" })
    .first()
    .click();
  await page.getByRole("button", { name: "Envie de refaire" }).first().click();
  await page.goto("./#/simulations");
  for (let i = 0; i < 3; i++) {
    await page.locator(".simulation-tabs button").nth(i).click();
    await page.locator(".simulation-choice").first().click();
    await page.getByRole("button", { name: "Et ensuite ?" }).click();
    await expect(page.getByText("UNE SUITE POSSIBLE")).toBeVisible();
    await page.getByRole("button", { name: "Essayer autrement" }).click();
  }
  await page.goto("./#/bilan");
  await page.getByLabel("Sorties réalisées").fill("2");
  await page.getByLabel("Conversations initiées").fill("3");
  await page.reload();
  await expect(page.getByLabel("Sorties réalisées")).toHaveValue("2");
  await page.goto("./#/parametres");
  await page
    .getByRole("button", { name: "Effacer mes données", exact: true })
    .click();
  await page.getByRole("button", { name: "Annuler", exact: true }).click();
  expect(
    await page.evaluate(() => !!localStorage.getItem("no-swipe-club:v1")),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Effacer mes données", exact: true })
    .click();
  await page.getByRole("button", { name: "Oui, effacer mes données" }).click();
  expect(
    await page.evaluate(() => localStorage.getItem("no-swipe-club:v1")),
  ).toBeNull();
  expect(errors).toEqual([]);
});
test("refuser la persistance laisse le programme utilisable sans données stockées", async ({
  page,
}) => {
  await diagnostic(page, false);
  await expect(
    page.getByRole("heading", { name: "La vraie vie commence ici." }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem("no-swipe-club:v1")),
  ).toBeNull();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Où en es-tu dans ta vie ?" }),
  ).toBeVisible();
});
test("navigation directe, 404 et absence de débordement desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("./");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "/tmp/nsc-desktop.png", fullPage: true });
  await page.goto("./#/inconnue");
  await expect(
    page.getByRole("heading", { name: /Cette piste/ }),
  ).toBeVisible();
  await page.goto("./#/confidentialite");
  await expect(
    page.getByRole("heading", { name: "Tes données. Tes choix." }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Tes données. Tes choix." }),
  ).toBeVisible();
});
test("sept missions, report sans culpabilisation, préférences et nouveau départ", async ({
  page,
}) => {
  await diagnostic(page);
  await page.getByRole("link", { name: "Découvrir ma mission" }).click();
  await page.getByRole("button", { name: "Reporter", exact: true }).click();
  await page.reload();
  await expect(
    page.getByText("Mission reportée. Tu peux changer d’avis."),
  ).toBeVisible();
  const plan = await page.evaluate(
    () =>
      JSON.parse(localStorage.getItem("no-swipe-club:v1")!).plan as string[],
  );
  for (const id of plan) {
    await page.goto(`./#/mission/${id}`);
    await page.getByRole("button", { name: "Marquer comme terminée" }).click();
  }
  await page.goto("./#/dashboard");
  await expect(
    page.getByRole("heading", { name: "Sept petits pas. Et la suite ?" }),
  ).toBeVisible();
  await page.goto("./#/bilan");
  await expect(page.getByText("LE BILAN DE TON EXPÉRIENCE")).toBeVisible();
  await page.goto("./#/parametres");
  await page.getByRole("button", { name: "Recommencer les 7 jours" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Recommencer", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("no-swipe-club:v1")!).statuses,
    ),
  ).toEqual({});
  await page.goto("./#/parametres");
  await page.getByRole("link", { name: "Modifier mes réponses" }).click();
  await expect(page.getByRole("radio", { name: "28–30" })).toBeChecked();
});
