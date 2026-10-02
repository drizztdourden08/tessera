/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const { releases } = JSON.parse(readFileSync(new URL('../RENAMES.json', import.meta.url), 'utf8'));
const SEMVER = /^\d+\.\d+\.\d+$/;
const parts = (version) => version.split('.').map(Number);
const older = (a, b) => {
  const [x, y] = [parts(a), parts(b)];
  const at = x.findIndex((n, i) => n !== y[i]);
  return at !== -1 && x[at] < y[at];
};
const maps = (release) => Object.entries(release).filter(([key]) => key !== 'version');
const chainsIn = (version, group, map) =>
  Object.entries(map).filter(([, to]) => typeof to === 'string' && Object.hasOwn(map, to)).map(([from, to]) => `${version} ${group}: ${from} -> ${to}`);
const releaseChains = (release) => maps(release).flatMap(([group, map]) => chainsIn(release.version, group, map));

describe('RENAMES.json', () => {
  it('lists releases oldest first, with next only as the last one', () => {
    const versions = releases.map((release) => release.version);
    const named = versions.filter((version) => version !== 'next');
    expect(named.every((version) => SEMVER.test(version))).toBe(true);
    expect(versions.indexOf('next') === -1 || versions.indexOf('next') === versions.length - 1).toBe(true);
    expect(named.every((version, i) => i === 0 || older(named[i - 1], version))).toBe(true);
  });

  it('maps every key of a release straight to its final name, so one pass is enough', () => {
    const chains = releases.flatMap(releaseChains);
    expect(chains).toEqual([]);
  });
});
