/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { codeEntries } from '../scripts/guide/code-entries.mjs';

const { releases } = JSON.parse(readFileSync(new URL('../RENAMES.json', import.meta.url), 'utf8'));
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SEMVER = /^\d+\.\d+\.\d+$/;
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;
const PROGRAM_TIMEOUT = 60_000;
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

const ENTRIES = new Map(codeEntries(manifest).filter(([key]) => key !== '.').map(([key, target]) => [key.slice(2), target]));
const movesOf = (release) => Object.entries(release.moves ?? {});
const allMoves = releases.flatMap((release, at) => movesOf(release).map(([name, move]) => ({ release, at, name, move })));

const moveChains = ({ release, name, move }) => {
  const where = `${release.version} moves: ${name}`;
  if (move.from === move.to) return [`${where} moves from ${move.from} to itself`];
  if (Object.hasOwn(release.components ?? {}, name)) return [`${where} is renamed in the same release; list the move under the new name`];
  if (Object.hasOwn(release.removedExports ?? {}, name)) return [`${where} is removed in the same release`];
  return [];
};

const exportsOf = () => {
  const files = [...ENTRIES].map(([key, target]) => [key, `${ROOT}${target.slice(2)}`]);
  const options = { module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, jsx: ts.JsxEmit.ReactJSX, types: [], noEmit: true };
  const program = ts.createProgram(files.map(([, file]) => file), options);
  const checker = program.getTypeChecker();
  const names = (file) => checker.getExportsOfModule(checker.getSymbolAtLocation(program.getSourceFile(file))).map((symbol) => symbol.name);
  return new Map(files.map(([key, file]) => [key, new Set(names(file))]));
};

const nameAfter = (release, name) => {
  if (Object.hasOwn(release.removedExports ?? {}, name)) return null;
  const renamed = release.components?.[name] ?? name;
  return IDENTIFIER.test(renamed) ? renamed : null;
};

const step = (release, { name, entry }) => {
  const now = nameAfter(release, name);
  if (now === null) return null;
  const move = release.moves?.[now];
  if (move && move.from !== entry) return { name: now, entry, broken: `${release.version} moves ${now} from ${move.from}, but it is in ${entry}` };
  return { name: now, entry: move ? move.to : entry };
};

const followed = ({ at, name, move }) => {
  let place = { name, entry: move.to };
  for (const release of releases.slice(at + 1)) {
    place = step(release, place);
    if (place === null || place.broken) return place;
  }
  return place;
};

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

  it('lists each move as from and to under its final name, between two different entry points', () => {
    expect(allMoves.flatMap(moveChains)).toEqual([]);
    const shapes = allMoves.filter(({ move }) => Object.keys(move).sort().join() !== 'from,to' || typeof move.from !== 'string');
    expect(shapes.map(({ name }) => name)).toEqual([]);
  });

  it('moves every name to an entry point of package.json exports', () => {
    const unknown = allMoves.filter(({ move }) => !ENTRIES.has(move.to)).map(({ release, name, move }) => `${release.version} ${name} -> ${move.to}`);
    expect(unknown).toEqual([]);
  });

  it('finds every moved name in the barrel of its entry point, after the later releases', () => {
    const exported = exportsOf();
    const places = allMoves.map((item) => ({ item, place: followed(item) })).filter(({ place }) => place !== null);
    expect(places.filter(({ place }) => place.broken).map(({ place }) => place.broken)).toEqual([]);
    const missing = places.filter(({ place }) => !exported.get(place.entry)?.has(place.name));
    expect(missing.map(({ item, place }) => `${item.release.version} ${item.name}: ${place.name} is not exported from ${place.entry}`)).toEqual([]);
  }, PROGRAM_TIMEOUT);
});
