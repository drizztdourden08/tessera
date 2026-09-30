/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { HINT_LABELS } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import type { DragView, DropZone } from '../behavior/drag.type';
import type { LaidOut } from '../behavior/layout-tree.type';
import { rectStyle } from '../behavior/rect-style';
import { DropHintZone } from './DropHintZone';
import { DropPopZone } from './DropPopZone';
import { DropPreview } from './DropPreview';
import type { DropHintsProps } from './DropHints.type';

const keyOf = (zone: DropZone): string => {
  const { target } = zone;
  if (target.at === 'outer') return `outer-${target.edge}`;
  if (target.at === 'leaf') return `leaf-${target.key}-${target.edge}`;
  if (target.at === 'tab') return `tab-${target.key}`;
  return 'float';
};

const swapRectOf = (view: DragView, laid: LaidOut): Rect | null => {
  if (!view.swapKey) return null;
  return laid.leaves.find((l) => l.node.key === view.swapKey)?.rect ?? null;
};

const DropHints = (props: DropHintsProps) => {
  const { view, laid } = props;
  const swapRect = swapRectOf(view, laid);
  const zones = view.swap ? [] : view.zones.filter((z) => z.kind !== 'float');

  return (
    <>
      {zones.map((zone) => <DropHintZone key={keyOf(zone)} zone={zone} hot={zone === view.hot} />)}
      {view.preview && !view.outside && <DropPreview rect={view.preview} refused={view.refused} />}
      {swapRect && (
        <Box className="dock-layout__swap" style={rectStyle(swapRect)} aria-hidden="true">
          <Span className="dock-layout__swap-label">{HINT_LABELS.swap}</Span>
        </Box>
      )}
      {(view.outside || view.stays) && <DropPopZone stays={view.stays} />}
    </>
  );
};

export { DropHints };
