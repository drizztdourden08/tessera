/* @layer tooling-scripts @kind test */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, afterEach, describe, expect, it } from 'vitest';
import { readNotes } from '../.storylite/review-notes-read';
import { syncRegistry } from '../.storylite/review-registry';
import { REVIEW_STORE_ENV } from '../.storylite/review.constants';

const STORE = mkdtempSync(join(tmpdir(), 'tessera-review-store-'));
const COPY = mkdtempSync(join(tmpdir(), 'tessera-review-copy-'));
const SHARED = { 'Primitives · Actions': { Button: { status: 'ok', hash: 'a1', at: '2026-10-04' } }, 'Core · Brand': { Mascot: { status: 'seen', hash: 'b2', at: '2026-10-04' } } };

mkdirSync(join(STORE, '.storylite'));
writeFileSync(join(STORE, '.storylite/review.json'), JSON.stringify(SHARED));
writeFileSync(join(STORE, '.storylite/review-notes.json'), JSON.stringify({ 'Core · Brand/Mascot': { text: 'shared note', at: '2026-10-04T00:00:00Z' } }));

afterEach(() => { delete process.env[REVIEW_STORE_ENV]; });
afterAll(() => { rmSync(STORE, { recursive: true }); rmSync(COPY, { recursive: true }); });

describe('a shared review store', () => {
  it('reads the notes and statuses from the store, not from the copy it runs in', () => {
    process.env[REVIEW_STORE_ENV] = STORE;
    expect(readNotes(COPY)['Core · Brand/Mascot']?.text).toBe('shared note');
    const next = syncRegistry(COPY, [{ title: 'Primitives · Actions/Button', hash: 'a1' }]);
    expect(next['Primitives · Actions']?.Button?.status).toBe('ok');
  });

  it('keeps the entries of pages the copy does not have', () => {
    process.env[REVIEW_STORE_ENV] = STORE;
    const next = syncRegistry(COPY, [{ title: 'Primitives · Actions/Button', hash: 'a1' }]);
    expect(next['Core · Brand']?.Mascot?.status).toBe('seen');
  });

  it('drops pages that are gone when the gallery runs on its own record', () => {
    mkdirSync(join(COPY, '.storylite'), { recursive: true });
    writeFileSync(join(COPY, '.storylite/review.json'), JSON.stringify(SHARED));
    const next = syncRegistry(COPY, [{ title: 'Primitives · Actions/Button', hash: 'a1' }]);
    expect(next['Core · Brand']).toBeUndefined();
  });
});
