/* @layer renderer-components @kind types */
import type { LayerMove } from '../behavior/useLayerMove.type';

type LayerMoveHandlesProps = Pick<LayerMove, 'onBandDown' | 'onBandKeyDown' | 'onEdgeDown'>;

export type { LayerMoveHandlesProps };
