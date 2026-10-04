// Spike harness: renders real Archipelia views and compounds (X:/archipelia) in isolation for the T-12..T-23 "today" shots.
// Hook stubs replace IPC hooks; run `node serve.mjs` then `node shoot.cjs http://localhost:4431 <outdir> <scene>=<file>`.
import { createServer } from 'file:///X:/archipelia/node_modules/.pnpm/vite@7.3.6_@types+node@24.19.0_jiti@2.7.0_yaml@2.9.1/node_modules/vite/dist/node/index.js';
import react from 'file:///X:/archipelia/node_modules/.pnpm/@vitejs+plugin-react@5.2.0__8cf2dd229b4aee414e0f68707b5cb18f/node_modules/@vitejs/plugin-react/dist/index.js';

import { existsSync, readFileSync } from 'node:fs';

const slash =(p) => p.split(String.fromCharCode(92)).join('/');
const HERE = slash(import.meta.dirname);
const ROOT = 'X:/archipelia/apps/desktop';
const ANCHOR = `${ROOT}/src/main.tsx`;
const STUBS = {
  'behavior/useServerManager': `${HERE}/stubs/useServerManager.ts`,
  'behavior/useConsole': `${HERE}/stubs/useConsole.ts`,
  'behavior/useLiveRoom': `${HERE}/stubs/useLiveRoom.ts`,
  'behavior/useStorageSummary': `${HERE}/stubs/useStorageSummary.ts`,
};
const isBare = (s) => !s.startsWith('.') && !s.startsWith('/') && !/^[A-Za-z]:/.test(s) && s.charCodeAt(0) !== 0 && !s.startsWith('virtual:');

const HTML = `<!DOCTYPE html>
<html lang="en" data-palette="archipelia">
  <head><meta charset="UTF-8" /><title>today</title></head>
  <body><div id="root"></div><script type="module" src="/@fs/${HERE}/main.tsx"></script></body>
</html>`;

const harness = {
  name: 'harness-resolve',
  enforce: 'pre',
  async resolveId(source, importer) {
    if (!importer) return null;
    const from = slash(importer);
    for (const [tail, file] of Object.entries(STUBS)) {
      if (source.endsWith(tail) && !from.startsWith(HERE)) return file;
    }
    if (from.startsWith(HERE) && isBare(source)) return this.resolve(source, ANCHOR, { skipSelf: true });
    return null;
  },
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const m = /\/tessera\/fonts\/([^?]+\.woff2)/.exec(req.url ?? '');
      if (!m) return next();
      const file = `${HERE}/../decide-wt/fonts/${decodeURIComponent(m[1])}`;
      if (!existsSync(file)) return next();
      res.setHeader('Content-Type', 'font/woff2');
      res.end(readFileSync(file));
    });
    server.middlewares.use(async (req, res, next) => {
      if (req.url !== '/' && !req.url.startsWith('/harness')) return next();
      const html = await server.transformIndexHtml('/harness.html', HTML);
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    });
  },
};

const server = await createServer({
  configFile: false,
  root: ROOT,
  cacheDir: `${HERE}/.vite`,
  plugins: [harness, react()],
  server: { port: 4431, strictPort: true, fs: { strict: false } },
  logLevel: 'info',
});
await server.listen();
server.printUrls();
