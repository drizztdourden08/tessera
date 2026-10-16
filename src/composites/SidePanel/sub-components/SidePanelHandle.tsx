/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import type { SidePanelHandleProps } from './SidePanelHandle.type';

const SidePanelHandle = (props: SidePanelHandleProps) => {
  const { handle, side, title, controls, onCollapse } = props;
  const { navigation } = useTesseraStrings();
  return (
    <ResizeHandle
      {...handle}
      edge={side}
      label={navigation.resizePane(title)}
      title={navigation.resizeHint}
      controls={controls}
      onCollapse={onCollapse}
      className="side-panel__handle"
    />
  );
};

export { SidePanelHandle };
