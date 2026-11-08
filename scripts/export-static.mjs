// Keep a deployable entry point even when Pages serves the repository root.
// The editable Vite entry lives in web/index.html; never edit the generated index.
import { cp, readFile, writeFile, mkdir } from "node:fs/promises";
const html = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
if (
  html.includes("/src/main.tsx") ||
  !html.includes("/no-swipe-club/assets/")
) {
  throw new Error(
    "Refusing to publish HTML that does not reference the compiled Pages assets.",
  );
}
await mkdir(new URL("../assets/", import.meta.url), { recursive: true });
// Retain old hashed files so a cached HTML document can still load its assets.
await cp(
  new URL("../dist/assets/", import.meta.url),
  new URL("../assets/", import.meta.url),
  { recursive: true },
);
await writeFile(new URL("../index.html", import.meta.url), html);
await writeFile(new URL("../.nojekyll", import.meta.url), "");
await writeFile(new URL("../dist/.nojekyll", import.meta.url), "");
