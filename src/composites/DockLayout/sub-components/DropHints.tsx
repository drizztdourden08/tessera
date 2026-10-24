/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import type { IconName } from '../../../primitives/Icon';
import { HINT_ICONS } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import type { DragView, DropZone } from '../behavior/drag.type';
import type { LaidOut } from '../behavior/layout-tree.type';
import { rectStyle } from '../../rect-drag/rect-style';
import { DropHintZone } from '../../dock-zones/DropHintZone';
import { DropPopZone } from '../../dock-zones/DropPopZone';
import { DropPreview } from '../../dock-zones/DropPreview';
import { SnapGuides } from './SnapGuides';
import type { DropHintsProps } from './DropHints.type';

const keyOf = (zone: DropZone): string => {
  const { target } = zone;
  if (target.at === 'outer') return `outer-${target.edge}`;
  if (target.at === 'leaf') return `leaf-${target.key}-${target.edge}`;
  if (target.at === 'tab') return `tab-${target.key}`;
  return 'float';
};

const iconOf = (zone: DropZone): IconName | undefined => {
  if (zone.kind !== 'compass') return undefined;
  const { target } = zone;
  if (target.at === 'tab') return HINT_ICONS.tab;
  return target.at === 'float' ? undefined : HINT_ICONS[target.edge];
};

const swapRectOf = (view: DragView, laid: LaidOut): Rect | null => {
  if (!view.swapKey) return null;
  return laid.leaves.find((l) => l.node.key === view.swapKey)?.rect ?? null;
};

const DropHints = (props: DropHintsProps) => {
  const { view, laid } = props;
  const { widgets } = useTesseraStrings();
  const swapRect = swapRectOf(view, laid);
  const zones = view.swap ? [] : view.zones.filter((z) => z.kind !== 'float');

  return (
    <>
      {zones.map((zone) => <DropHintZone key={keyOf(zone)} hit={zone.hit} kind={zone.kind} icon={iconOf(zone)} hot={zone === view.hot} />)}
      {view.preview && !view.outside && <DropPreview rect={view.preview} refused={view.refused} />}
      {!view.outside && <SnapGuides guides={view.guides} />}
      {swapRect && (
        <Box className="dock-layout__swap" style={rectStyle(swapRect)} aria-hidden="true">
          <Span className="dock-layout__swap-label">{widgets.hintSwap}</Span>
        </Box>
      )}
      {(view.outside || view.stays) && <DropPopZone stays={view.stays} />}
    </>
  );
};

export { DropHints };
