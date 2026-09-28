/* @layer renderer-components @kind logic */
import type { FieldKind } from '../field-descriptor';
import { ENUM_MAX, ID_RE } from './infer-kind.constants';
import { isPlainObject } from './is-plain-object';
import { present } from './present';

const shapeOf = (value: unknown): 'container' | 'primitive' =>
  typeof value === 'object' && value !== null ? 'container' : 'primitive';

const keySignature = (obj: Record<string, unknown>): ReadonlySet<string> =>
  new Set(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null).map(([k]) => k));

const isSubsetOf = (a: ReadonlySet<string>, b: ReadonlySet<string>): boolean =>
  [...a].every((key) => b.has(key));

const distinctSignatures = (objects: readonly Record<string, unknown>[]): readonly ReadonlySet<string>[] => {
  const bySerial = new Map<string, ReadonlySet<string>>();
  for (const obj of objects) {
    const signature = keySignature(obj);
    const serial = [...signature].sort().join(',');
    if (!bySerial.has(serial)) bySerial.set(serial, signature);
  }
  return [...bySerial.values()];
};

const isKeySubsetChain = (signatures: readonly ReadonlySet<string>[]): boolean => {
  return signatures.every((a, i) =>
    signatures.slice(i + 1).every((b) => isSubsetOf(a, b) || isSubsetOf(b, a)));
};

const isVariantShape = (objects: readonly Record<string, unknown>[]): boolean => {
  const shapes = new Map<string, 'container' | 'primitive'>();
  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined || value === null) continue;
      const seen = shapes.get(key);
      if (seen === undefined) shapes.set(key, shapeOf(value));
      else if (seen !== shapeOf(value)) return true;
    }
  }
  return !isKeySubsetChain(distinctSignatures(objects));
};

const inferStringKind = (strings: readonly string[], idPattern: RegExp): FieldKind => {
  if (strings.every((s) => idPattern.test(s))) return 'idRef';
  return new Set(strings).size <= ENUM_MAX ? 'enum' : 'string';
};

const inferKind = (values: readonly unknown[], idPattern: RegExp = ID_RE): FieldKind => {
  const sampled = present(values);
  if (!sampled.length) return 'unknown';
  if (sampled.every((v) => typeof v === 'boolean')) return 'boolean';
  if (sampled.every((v) => typeof v === 'number')) return 'number';
  if (sampled.every((v) => Array.isArray(v))) return 'array';
  if (sampled.every((v) => typeof v === 'string')) return inferStringKind(sampled, idPattern);
  if (sampled.every(isPlainObject)) return isVariantShape(sampled) ? 'union' : 'object';
  return 'unknown';
};

export { inferKind };
