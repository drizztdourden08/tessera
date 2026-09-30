/* @layer root-config @kind config */
import type { Plugin } from 'vite';
import { reviewColours } from './review-colours';
import { REVIEW_CACHE_MS, REVIEW_ROUTE } from './review.constants';

const reviewPlugin = (root: string): Plugin => {
  let cached = { at: 0, body: '{}' };
  const body = (): string => {
    if (Date.now() - cached.at > REVIEW_CACHE_MS) cached = { at: Date.now(), body: JSON.stringify(reviewColours(root)) };
    return cached.body;
  };
  return {
    name: 'tessera:review',
    configureServer: (server) => {
      server.middlewares.use(REVIEW_ROUTE, (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(body());
      });
    },
  };
};

export { reviewPlugin };
