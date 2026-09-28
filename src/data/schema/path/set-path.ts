/* @layer renderer-components @kind logic */
import { isContainer } from './is-container';
import type { Container } from './path.type';

const isIndexSegment = (segment: string): boolean => /^\d+$/.test(segment);

const emptyFor = (segment: string): Container => (isIndexSegment(segment) ? [] : {});

const copyArray = (items: readonly unknown[]): unknown[] => [...items];

const cloneContainer = (value: unknown, nextSegment: string): Container => {
  if (Array.isArray(value)) return copyArray(value);
  if (isContainer(value)) return { ...value };
  return emptyFor(nextSegment);
};

const setIn = (target: unknown, segments: readonly string[], value: unknown): unknown => {
  const [head, ...rest] = segments;
  if (head === undefined) return value;
  const clone = cloneContainer(target, head);
  const [next] = rest;
  if (next === undefined) {
    Reflect.set(clone, head, value);
    return clone;
  }
  const child: unknown = Reflect.get(clone, head);
  Reflect.set(clone, head, setIn(isContainer(child) ? child : emptyFor(next), rest, value));
  return clone;
};

const setPath = <T>(obj: T, path: string, value: unknown): T => {
  if (!path) return value as T;
  return setIn(obj, path.split('.'), value) as T;
};

export { setPath };
