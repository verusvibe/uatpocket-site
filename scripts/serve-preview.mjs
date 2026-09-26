// Local-only static preview with production-style compression and asset caching.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzipSync } from "node:zlib";
const root = resolve("out");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};
createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405);
      return res.end();
    }
    const url = new URL(req.url, "http://127.0.0.1:3000");
    if (
      basePath &&
      url.pathname !== basePath &&
      !url.pathname.startsWith(`${basePath}/`)
    ) {
      res.writeHead(404);
      return res.end("Not found");
    }
    const pathname = url.pathname.slice(basePath.length) || "/";
    let file = resolve(root, "." + decodeURIComponent(pathname));
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      return res.end();
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    let body = await readFile(file);
    const ext = extname(file);
    const headers = {
      "Content-Type": types[ext] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Cache-Control": pathname.startsWith("/_next/static/")
        ? "public, max-age=31536000, immutable"
        : "no-cache",
    };
    if (
      /\bgzip\b/.test(req.headers["accept-encoding"] || "") &&
      [".html", ".js", ".css", ".json", ".xml", ".txt"].includes(ext)
    ) {
      body = gzipSync(body);
      headers["Content-Encoding"] = "gzip";
      headers.Vary = "Accept-Encoding";
    }
    res.writeHead(200, headers);
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}).listen(3000, "127.0.0.1", () =>
  console.log(`Preview: http://127.0.0.1:3000${basePath}/`),
);
