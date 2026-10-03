/* @layer root-config @kind config */
import type { ServerResponse } from 'node:http';
import type { Connect, Plugin, ViteDevServer } from 'vite';
import { sameOrigin } from './review-origin';
import { readBody } from './review-read-body';
import {
  REVIEW_BODY_LIMIT, REVIEW_CACHE_MS, REVIEW_FILE, REVIEW_MODULE, REVIEW_NOTE_ROUTE, REVIEW_NOTES_FILE, REVIEW_POST_MODULE, REVIEW_ROUTE,
  REVIEW_SET_ROUTE,
} from './review.constants';
import type { ReviewPostKind, ReviewReply, ReviewState } from './review.type';

const send = (res: ServerResponse, code: number, text: string): void => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(text);
};

const fail = (res: ServerResponse, code: number, error: unknown): void => send(res, code, JSON.stringify({ error: String(error) }));

const serverUrls = (server: ViteDevServer): string[] => [...(server.resolvedUrls?.local ?? []), ...(server.resolvedUrls?.network ?? [])];

const reviewPlugin = (root: string): Plugin => {
  let cached = { at: 0, body: '{}' };
  return {
    name: 'tessera:review',
    config: () => ({ server: { watch: { ignored: [`**/${REVIEW_FILE}`, `**/${REVIEW_NOTES_FILE}`] } } }),
    configureServer: (server) => {
      const body = async (): Promise<string> => {
        if (Date.now() - cached.at <= REVIEW_CACHE_MS) return cached.body;
        const mod = await server.ssrLoadModule(REVIEW_MODULE);
        const state = (mod['reviewState'] as (dir: string) => ReviewState)(root);
        cached = { at: Date.now(), body: JSON.stringify(state) };
        return cached.body;
      };
      const write = async (kind: ReviewPostKind, raw: string): Promise<ReviewReply> => {
        const mod = await server.ssrLoadModule(REVIEW_POST_MODULE);
        return (mod['reviewPost'] as (dir: string, k: ReviewPostKind, text: string) => ReviewReply)(root, kind, raw);
      };
      const post = (kind: ReviewPostKind): Connect.NextHandleFunction => (req, res) => {
        if (req.method !== 'POST') return fail(res, 405, 'Use POST.');
        if (!sameOrigin(req.headers.origin, serverUrls(server))) return fail(res, 403, 'Only the gallery itself may write the review.');
        readBody(req, REVIEW_BODY_LIMIT)
          .then((raw) => write(kind, raw))
          .then((reply) => {
            if (reply.code !== 200 || !reply.state) return fail(res, reply.code, reply.error);
            cached = { at: Date.now(), body: JSON.stringify(reply.state) };
            return send(res, 200, cached.body);
          })
          .catch((error: unknown) => fail(res, 500, error));
      };
      server.middlewares.use(REVIEW_SET_ROUTE, post('set'));
      server.middlewares.use(REVIEW_NOTE_ROUTE, post('note'));
      server.middlewares.use(REVIEW_ROUTE, (_req, res) => {
        body().then((text) => send(res, 200, text), (error: unknown) => fail(res, 500, error));
      });
    },
  };
};

export { reviewPlugin };
