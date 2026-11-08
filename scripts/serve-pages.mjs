// Test-only static server. No Vite transforms or SPA fallback: serve dist as Pages does.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve(process.env.PAGES_DIRECTORY || "dist");
const base = "/no-swipe-club/";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    if (!pathname.startsWith(base)) {
      response.writeHead(404).end();
      return;
    }
    const file = resolve(root, pathname.slice(base.length) || "index.html");
    if (!file.startsWith(root + sep)) {
      response.writeHead(404).end();
      return;
    }
    const content = await readFile(file);
    response.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    response.end(content);
  } catch {
    response.writeHead(404).end();
  }
}).listen(4183, "127.0.0.1");
