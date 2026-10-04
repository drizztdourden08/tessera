import { useState } from 'react';
import type { ServerEntry } from '@archipelia/model';
import { SERVERS } from '../data';

const PROBLEMS: Record<string, string[]> = {
  srv3: ['Enter the path of the key file.', 'The Archipelago path must be absolute.'],
};

const useServerManager = () => {
  const pick = new URLSearchParams(location.hash.split('?')[1] ?? '').get('server') ?? 'srv1';
  const [draft, setDraft] = useState<ServerEntry | null>(SERVERS.find((s) => s.id === pick) ?? null);
  const noop = () => {};
  return {
    busy: false, create: noop, draft, error: null, inputs: { password: '', passphrase: '' }, problems: PROBLEMS[pick] ?? [],
    remove: noop, runTest: noop, save: noop, select: (e: ServerEntry) => setDraft(e), servers: SERVERS, setDraft, setInputs: noop,
    test: draft?.lastTest ?? null, trust: noop,
  };
};

export { useServerManager };
