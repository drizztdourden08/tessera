/* @layer renderer-components @kind data */
import { facetPiece } from './facet-piece';
import type { PelagoPieceName, PlacedPiece } from './pelago.type';
import { PELAGO_CRYSTAL } from './pelago-crystal.constants';
import { PELAGO_AURA, PELAGO_EYE, PELAGO_HALO, PELAGO_SPARK } from './pelago-glow.constants';
import { PELAGO_SHARD, PELAGO_STONE } from './pelago-pebble.constants';
import { PELAGO_RIG } from './pelago-rig.constants';
import { PELAGO_ROCK } from './pelago-rock.constants';
import { placedFacets } from './placed-facets';

const [pebbleA, pebbleB, pebbleC] = PELAGO_RIG.pebbles;

const PELAGO_PIECES: Readonly<Record<PelagoPieceName, PlacedPiece>> = {
  aura: facetPiece('Aura', PELAGO_AURA),
  rock: facetPiece('Rock', PELAGO_ROCK),
  halo: facetPiece('Halo', PELAGO_HALO),
  crystal: facetPiece('Crystal', PELAGO_CRYSTAL),
  eye: facetPiece('Eye', PELAGO_EYE),
  spark: facetPiece('Spark', PELAGO_SPARK),
  pebbleA: placedFacets('Pebble', PELAGO_STONE, { at: pebbleA }),
  pebbleB: placedFacets('Small pebble', PELAGO_STONE, { at: pebbleB, size: 0.8, mirror: true }),
  pebbleC: placedFacets('Shard', PELAGO_SHARD, { at: pebbleC }),
};

export { PELAGO_PIECES };
