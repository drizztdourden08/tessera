/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { rectStyle } from '../../rect-drag/rect-style';
import { useCornerTurns } from '../behavior/useCornerTurns';
import { DockCorners } from './DockCorners';
import { DockDivider } from './DockDivider';
import { DockFloating } from './DockFloating';
import { DockPanes } from './DockPanes';
import { DragGhost } from '../../dock-zones/DragGhost';
import { DropHints } from './DropHints';
import { MainGrip } from './MainGrip';
import type { DockSceneProps } from './DockScene.type';

const DockScene = (props: DockSceneProps) => {
  const {
    laid, mainRect, main, floating, drag, ownDrag, dragId, stageRef, onEdit, renderPane, renderFloating, mainLabel, gripLabel, mainGrip,
    floatingMin, floatSnap, stage, peek, tree, labelOf,
  } = props;
  const { widgets } = useTesseraStrings();
  const showGrip = mainGrip === 'always' || (mainGrip === 'dragging' && drag !== null);
  const corners = useCornerTurns(laid, tree, labelOf, onEdit);
  const still = !peek && drag === null;
  return (
    <>
      {mainRect && main != null && <Box className="dock-layout__main" style={rectStyle(mainRect)}>{main}</Box>}
      <DockPanes laid={laid} renderPane={renderPane} />
      {laid.dividers.map((divider, i) => (
        <DockDivider
          key={`${divider.node.axis}-${i}`}
          divider={divider}
          zones={still ? corners.zones.filter((zone) => zone.divider === i) : []}
          hint={corners.hint}
          onEdit={onEdit}
          onTurn={corners.turn}
        />
      ))}
      <DockCorners corners={corners} hidden={!still} />
      {mainRect && (
        <>
          {showGrip && <MainGrip rect={mainRect} stageRef={stageRef} label={gripLabel} hint={widgets.moveMainHint(mainLabel)} />}
          <DockFloating
            floating={floating}
            mainRect={mainRect}
            stage={stage}
            floatSnap={floatSnap}
            drag={drag}
            dragId={dragId}
            min={floatingMin}
            resizable={!peek}
            onEdit={onEdit}
            renderFloating={renderFloating}
          />
        </>
      )}
      {drag && <DropHints view={drag} laid={laid} />}
      {ownDrag && <DragGhost pointer={ownDrag.pointer} label={ownDrag.label} swap={ownDrag.swap} overlay={ownDrag.overlay} />}
    </>
  );
};

export { DockScene };
