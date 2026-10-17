/* @layer renderer-components @kind logic */
import type { ScreenLayerProps } from '../ScreenLayer.type';
import type { LayerMove } from './useLayerMove.type';

const layerClass = (props: ScreenLayerProps, moving: LayerMove): string => [
  'screen-layer',
  `screen-layer--${props.size ?? 'fill'}`,
  props.hidden && 'screen-layer--hidden',
  props.square && 'screen-layer--square',
  props.tight && 'screen-layer--tight',
  props.move && 'screen-layer--movable',
  moving.placed && 'screen-layer--placed',
  moving.dragging && 'screen-layer--dragging',
].filter(Boolean).join(' ');

export { layerClass };
