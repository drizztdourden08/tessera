/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { rectStyle } from '../behavior/rect-style';
import { DockFloating } from './DockFloating';
import { DockPanes } from './DockPanes';
import { DragGhost } from './DragGhost';
import { DropHints } from './DropHints';
import { MainGrip } from './MainGrip';
import { SplitDivider } from './SplitDivider';
import type { DockSceneProps } from './DockScene.type';

const DockScene = (props: DockSceneProps) => {
  const {
    laid, mainRect, main, floating, drag, ownDrag, dragId, stageRef, onEdit, renderPane, renderFloating, mainLabel, gripLabel,
  } = props;
  return (
    <>
      {mainRect && main != null && <Box className="dock-layout__main" style={rectStyle(mainRect)}>{main}</Box>}
      <DockPanes laid={laid} renderPane={renderPane} />
      {laid.dividers.map((divider, i) => (
        <SplitDivider key={`${divider.node.axis}-${i}`} divider={divider} onEdit={onEdit} />
      ))}
      {mainRect && (
        <>
          <MainGrip rect={mainRect} stageRef={stageRef} label={gripLabel} hint={`Drag to move the ${mainLabel.toLowerCase()}`} />
          <DockFloating floating={floating} mainRect={mainRect} drag={drag} dragId={dragId} renderFloating={renderFloating} />
        </>
      )}
      {drag && <DropHints view={drag} laid={laid} />}
      {ownDrag && <DragGhost view={ownDrag} />}
    </>
  );
};

export { DockScene };
