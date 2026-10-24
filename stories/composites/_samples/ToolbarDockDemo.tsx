/* @layer stories @kind component */
import { useState } from 'react';
import { Toolbar, ToolbarDock, createToolbarLayout, showToolbar } from '../../../src/composites';
import type { ToolbarDefinition, ToolbarItem } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { DOCK_TOOLBARS } from './toolbar-dock-story.constants';

const DEFINITIONS: ToolbarDefinition[] = DOCK_TOOLBARS.map(({ id, label, side }) => ({ id, label, defaultSide: side }));

const itemsOf = (id: string): ToolbarItem[] => (DOCK_TOOLBARS.find((spec) => spec.id === id)?.tools ?? []).map((tool) => ({
  kind: 'button', id: tool.id, label: tool.label, icon: tool.icon, onSelect: () => undefined,
}));

const ToolbarDockDemo = ({ className }: { className?: string }) => {
  const [layout, setLayout] = useState(() => createToolbarLayout(DEFINITIONS));
  return (
    <Box className={['toolbar-dock-story', className].filter(Boolean).join(' ')}>
      <ToolbarDock
        layout={layout}
        onLayoutChange={setLayout}
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
          {layout.hidden.length > 0 && (
            <Box className="toolbar-dock-story__hidden">
              {layout.hidden.map((id) => (
                <Button key={id} size="xs" variant="secondary" onClick={() => setLayout(showToolbar(layout, id, DEFINITIONS))}>
                  {`Show ${DEFINITIONS.find((definition) => definition.id === id)?.label ?? id}`}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </ToolbarDock>
    </Box>
  );
};

export { ToolbarDockDemo };
