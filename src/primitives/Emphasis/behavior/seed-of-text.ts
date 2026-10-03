/* @layer renderer-components @kind logic */
const seedOfText = (text: string): number =>
  Array.from(text).reduce((hash, char) => Math.imul(hash ^ (char.codePointAt(0) ?? 0), 16777619) >>> 0, 2166136261);

export { seedOfText };
