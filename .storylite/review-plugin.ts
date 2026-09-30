/* @layer root-config @kind config */
import type { Plugin } from 'vite';
import { REVIEW_CACHE_MS, REVIEW_MODULE, REVIEW_ROUTE } from './review.constants';
import type { ReviewState } from './review.type';

const reviewPlugin = (root: string): Plugin => {
  let cached = { at: 0, body: '{}' };
  return {
    name: 'tessera:review',
    configureServer: (server) => {
      const body = async (): Promise<string> => {
        if (Date.now() - cached.at <= REVIEW_CACHE_MS) return cached.body;
        const mod = await server.ssrLoadModule(REVIEW_MODULE);
        const state = (mod['reviewState'] as (dir: string) => ReviewState)(root);
        cached = { at: Date.now(), body: JSON.stringify(state) };
        return cached.body;
      };
      server.middlewares.use(REVIEW_ROUTE, (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        body().then((text) => res.end(text), (error: unknown) => {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(error) }));
        });
      });
    },
  };
};

export { reviewPlugin };
