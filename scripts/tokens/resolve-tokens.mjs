/* @layer tooling-scripts @kind logic */
import { evaluateColourMix } from './evaluate-colour-mix.mjs';

const VAR = /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/;

const resolveTokens = (declarations) => {
  const raw = new Map(declarations);
  const done = new Map();
  const resolve = (name, trail) => {
    if (done.has(name)) return done.get(name);
    if (trail.includes(name)) throw new Error(`token cycle: ${[...trail, name].join(' > ')}`);
    let value = raw.get(name);
    if (value === undefined) throw new Error(`token ${name} is used but never set (${trail.join(' > ')})`);
    for (let match = VAR.exec(value); match; match = VAR.exec(value)) {
      const [whole, ref, fallback] = match;
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
