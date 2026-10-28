/* @layer tooling-scripts @kind logic */
const groupBarrel = (kind, kindDir, group) =>
  (kind === 'primitive' ? `${kindDir}/${group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-exports/index.ts` : `${kindDir}/index.ts`);

export { groupBarrel };
