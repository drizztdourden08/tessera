/* @layer renderer-components @kind logic */
import { readStored } from '../../../primitives/dom/read-stored';

const commandList = (stored: unknown): readonly string[] | undefined =>
  (Array.isArray(stored) && stored.every((entry) => typeof entry === 'string') ? stored : undefined);

const readStoredHistory = (storageKey: string | undefined): readonly string[] => readStored(storageKey, commandList) ?? [];

export { readStoredHistory };
