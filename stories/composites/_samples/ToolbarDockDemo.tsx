/* @layer stories @kind component */
import { useState } from 'react';
import { DropdownMenu, Toolbar, ToolbarDock, createToolbarLayout, toolbarMenuGroups, useToolbarLayout } from '../../../src/composites';
import type { ToolbarDefinition, ToolbarItem, ToolbarLayout } from '../../../src/composites';
import { Box, Text, useTesseraStrings } from '../../../src/primitives';
import { DOCK_TOOLBARS } from './toolbar-dock-story.constants';

const DEFINITIONS: ToolbarDefinition[] = DOCK_TOOLBARS.map(({ id, label, side }) => ({ id, label, defaultSide: side }));

const itemsOf = (id: string): ToolbarItem[] => (DOCK_TOOLBARS.find((spec) => spec.id === id)?.tools ?? []).map((tool) => ({
  kind: 'button', id: tool.id, label: tool.label, icon: tool.icon, onSelect: () => undefined,
}));

const ToolbarDockDemo = ({ className, initial, hint }: { className?: string; initial?: ToolbarLayout; hint?: string }) => {
  const [value, onChange] = useState(() => initial ?? createToolbarLayout(DEFINITIONS));
  const { layout, toggle, reset } = useToolbarLayout({ value, onChange, definitions: DEFINITIONS });
  const { toolbars } = useTesseraStrings();
  return (
    <Box className={['toolbar-dock-story', className].filter(Boolean).join(' ')}>
      <ToolbarDock
        layout={layout}
        onLayoutChange={onChange}
        definitions={DEFINITIONS}
        renderToolbar={(id, { orientation, handle }) => (
          <Toolbar
            label={DEFINITIONS.find((definition) => definition.id === id)?.label ?? id}
            items={itemsOf(id)}
            orientation={orientation}
            handle
            handleProps={handle}
          />
        )}
      >
        <Box className="toolbar-dock-story__work">
          <Text className="story-label">Work area</Text>
          {hint ? <Text className="toolbar-dock-story__hint">{hint}</Text> : null}
          <DropdownMenu
            trigger={{ label: toolbars.menu, icon: 'layout-grid' }}
            groups={toolbarMenuGroups(DEFINITIONS, layout, toggle, { ...toolbars, onReset: reset })}
            size="sm"
            closeOnSelect={false}
          />
        </Box>
      </ToolbarDock>
    </Box>
  );
};

export { ToolbarDockDemo };
