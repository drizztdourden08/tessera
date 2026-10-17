/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeEdges } from '../../rect-drag/ResizeEdges';
import type { LayerMoveHandlesProps } from './LayerMoveHandles.type';
import './LayerMoveHandles.css';

const LayerMoveHandles = (props: LayerMoveHandlesProps) => {
  const { onBandDown, onBandKeyDown, onEdgeDown } = props;
  const { windows } = useTesseraStrings();
  return (
    <>
      <Pressable
        className="screen-layer__move"
        aria-label={windows.moveWindow}
        title={windows.moveHint}
        onPointerDown={onBandDown}
        onKeyDown={onBandKeyDown}
      />
      <ResizeEdges onPointerDown={onEdgeDown} />
    </>
  );
};

export { LayerMoveHandles };
