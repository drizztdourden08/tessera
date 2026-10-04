/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { KeyValueProblem, KeyValueRow } from '../KeyValueEditor.type';

const rowsProblem = (rows: readonly KeyValueRow[], keys: readonly string[] | undefined, { options }: TesseraStrings): KeyValueProblem => {
  const empty = rows.filter((row) => !row.key.trim());
  if (empty.length) return { rows: new Set(empty.map((row) => row.id)), message: options.emptyKey };
  const seen = new Map<string, string>();
  const twice = rows.find((row) => {
    const other = seen.get(row.key.trim());
    seen.set(row.key.trim(), row.id);
    return other !== undefined;
  });
  if (twice) return { rows: new Set(rows.filter((row) => row.key.trim() === twice.key.trim()).map((row) => row.id)), message: options.listedTwice(twice.key.trim()) };
  const unknown = keys?.length ? rows.find((row) => !keys.includes(row.key.trim())) : undefined;
  if (unknown) return { rows: new Set([unknown.id]), message: options.unknownKey(unknown.key.trim()) };
  return { rows: new Set(), message: null };
};

export { rowsProblem };
