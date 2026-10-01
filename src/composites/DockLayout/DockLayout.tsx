/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { DockLayoutProps } from './DockLayout.type';
import { dockSettings } from './behavior/dock-settings';
import { useDockDrag } from './behavior/useDockDrag';
import { useDockStage } from './behavior/useDockStage';
import { useExternalDrag } from './behavior/useExternalDrag';
import { DockScene } from './sub-components/DockScene';
import './DockLayout.css';

const DockLayout = (props: DockLayoutProps) => {
  const { layout, renderPane, renderFloating, onEdit, onPopOut, onExternalDrop, sizeOf, main, className } = props;
  const { widgets } = useTesseraStrings();
  const settings = dockSettings(props, widgets);
  const stageRef = useRef<HTMLDivElement>(null);
  const { laid, mainRect, context } = useDockStage(stageRef, { ...props, ...settings, strings: widgets });
  const own = useDockDrag({ stageRef, context, onEdit, onPopOut });
  const arriving = useExternalDrag({ stageRef, context, externalDrag: settings.externalDrag, onExternalDrop, sizeOf });
  const drag = own.drag ?? arriving;
  const cls = ['dock-layout', drag && 'dock-layout--dragging', className].filter(Boolean).join(' ');

  return (
    <Box ref={stageRef} className={cls} data-testid="dock-layout" onPointerDown={own.onPointerDown}>
      {laid && (
        <DockScene
          laid={laid}
          mainRect={mainRect}
          main={main}
          floating={layout.floating}
          drag={drag}
          ownDrag={own.drag}
          dragId={own.dragId}
          stageRef={stageRef}
          onEdit={onEdit}
          renderPane={renderPane}
          renderFloating={renderFloating}
          mainLabel={settings.mainLabel}
          gripLabel={settings.gripLabel}
          mainGrip={settings.mainGrip}
        />
      )}
    </Box>
  );
};

export { DockLayout };
