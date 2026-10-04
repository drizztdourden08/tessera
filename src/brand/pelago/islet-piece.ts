/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { IsletId, PlacedPiece } from './pelago.type';
import { PELAGO_ISLET } from './pelago-islet.constants';
import { PELAGO_RIG } from './pelago-rig.constants';
import { placedFacets } from './placed-facets';

const isletPiece = (id: IsletId, [dx, dy]: ScenePoint = [0, 0]): PlacedPiece => {
  const { node, size, mirror } = PELAGO_RIG.islets[id];
  return placedFacets(`Islet ${id.toUpperCase()}`, PELAGO_ISLET, { at: [node[0] + dx, node[1] + dy], size, mirror });
};

export { isletPiece };
