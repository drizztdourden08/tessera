/* @layer renderer-components @kind logic */
import { toText } from './to-text';

const stringify: (
  value: unknown,
  replacer: (key: string, entry: unknown) => unknown,
) => string | undefined = JSON.stringify;

const toJson = (value: unknown): string => {
  const seen = new WeakSet();
  try {
    const json = stringify(value, (_key, entry) => {
      if (typeof entry === 'object' && entry !== null) {
        if (seen.has(entry)) return '[circular]';
        seen.add(entry);
      }
      return entry;
    });
    return json ?? toText(value);
  } catch {
    return toText(value);
  }
};

export { toJson };
