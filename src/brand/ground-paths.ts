/* @layer renderer-components @kind logic */
import type { Ground } from '../primitives/ground/ground.type';
import type { BrandMarkPath } from './brand.type';

const groundPaths = (paths: readonly BrandMarkPath[], ground: Ground): readonly BrandMarkPath[] =>
  (ground === 'dark' ? paths.map((p) => (p.onDark ? { ...p, ink: p.onDark } : p)) : paths);

export { groundPaths };
