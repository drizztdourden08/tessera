/* @layer tooling-scripts @kind logic */
import { evaluateColourMix } from './evaluate-colour-mix.mjs';

const OPEN = /var\(\s*(--[\w-]+)\s*/;

const closeAt = (text, from) => {
  let depth = 1;
  for (let at = from; at < text.length; at += 1) {
    if (text[at] === '(') depth += 1;
    if (text[at] === ')') depth -= 1;
    if (depth === 0) return at;
  }
  return -1;
};

const findVar = (value) => {
  const open = OPEN.exec(value);
  if (!open) return null;
  const bodyStart = open.index + open[0].length;
  const end = closeAt(value, bodyStart);
  if (end === -1) throw new Error(`unbalanced var() in ${value}`);
  const rest = value.slice(bodyStart, end).trim();
  return { whole: value.slice(open.index, end + 1), ref: open[1], fallback: rest.startsWith(',') ? rest.slice(1).trim() : undefined };
};

const resolveTokens = (declarations) => {
  const raw = new Map(declarations);
  const done = new Map();
  const resolve = (name, trail) => {
    if (done.has(name)) return done.get(name);
    if (trail.includes(name)) throw new Error(`token cycle: ${[...trail, name].join(' > ')}`);
    let value = raw.get(name);
    if (value === undefined) throw new Error(`token ${name} is used but never set (${trail.join(' > ')})`);
    for (let found = findVar(value); found; found = findVar(value)) {
      const { whole, ref, fallback } = found;
      const literal = raw.has(ref) ? resolve(ref, [...trail, name]) : fallback;
      if (literal === undefined) throw new Error(`token ${ref} is used by ${name} but never set`);
      value = value.replace(whole, literal);
    }
    done.set(name, evaluateColourMix(value));
    return done.get(name);
  };
  return new Map([...raw.keys()].map((name) => [name, resolve(name, [])]));
};

export { resolveTokens };
