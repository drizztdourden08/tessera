/* @layer stories @kind component */
import { useCallback, useMemo, useRef, useState } from 'react';
import { DockLayout, applyEdit, removeEverywhere, useDockKeys } from '../../../src/composites';
import type { DockMainGrip, FloatingWidget, LayoutEdit, PaneNode, Rect, WidgetId, WidgetLayout } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { dockDemoLayout } from './dock-demo-layouts';
import { DOCK_LABELS, FALLBACK_MAIN } from './dock-demo.constants';
import { DockDemoPane } from './DockDemoPane';

type DockDemoProps = {
  peek?: boolean;
  swap?: boolean;
  overlay?: boolean;
  floating?: boolean;
  mainLabel?: string;
  gripLabel?: string;
  mainGrip?: DockMainGrip;
  className?: string;
};

const labelOf = (id: WidgetId): string => DOCK_LABELS[id] ?? id;

const DockDemo = (props: DockDemoProps) => {
  const { peek = false, swap = false, overlay = false, floating = true, mainLabel, gripLabel, mainGrip, className = '' } = props;
  const [layout, setLayout] = useState<WidgetLayout>(() => dockDemoLayout(floating));
  const keys = useDockKeys();
  const mainRef = useRef<Rect | null>(null);
  const onEdit = useCallback((edit: LayoutEdit) => setLayout((prev) => applyEdit(prev, edit, mainRef.current ?? FALLBACK_MAIN)), []);
  const onClose = useCallback((id: WidgetId) => setLayout((prev) => removeEverywhere(prev, id)), []);
  const modifiers = useMemo(() => ({ swap: swap || keys.modifiers.swap, overlay: overlay || keys.modifiers.overlay }), [swap, overlay, keys.modifiers]);
  const folded = peek || keys.peek;
  const pane = (ids: WidgetId[], active: WidgetId, paneKey: string | null) => (
    <DockDemoPane ids={ids} active={active} paneKey={paneKey} peek={folded && paneKey !== null} onEdit={onEdit} onClose={onClose} />
  );

  return (
    <Box className={`story-frame dock-story ${className}`}>
      <DockLayout
        layout={layout}
        renderPane={(node: PaneNode) => pane(node.widgets, node.active, node.key)}
        renderFloating={(f: FloatingWidget) => pane([f.id], f.id, null)}
        onEdit={onEdit}
        labelOf={labelOf}
        canPopOut={() => false}
        peek={folded}
        modifiers={modifiers}
        onMainRect={(rect) => { mainRef.current = rect; }}
        mainLabel={mainLabel}
        gripLabel={gripLabel}
        mainGrip={mainGrip}
        main={(
          <Box className="dock-story__main">
            <Text className="story-label">Main view</Text>
            <Text>Drag a title bar, a tab or the grip on top of the main view.</Text>
          </Box>
        )}
      />
    </Box>
  );
};

export { DockDemo };
