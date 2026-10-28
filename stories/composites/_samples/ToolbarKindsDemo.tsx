/* @layer stories @kind component */
import { Toolbar } from '../../../src/composites';
import type { ToolbarShape } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { useToolKinds } from './useToolKinds';

interface ToolbarKindsDemoProps {
  orientation?: 'horizontal' | 'vertical';
  layout?: ToolbarShape;
  keyBadges?: boolean;
  inlineOptions?: boolean;
}

const ToolbarKindsDemo = ({ orientation = 'vertical', layout = 'bar', keyBadges = false, inlineOptions = false }: ToolbarKindsDemoProps) => {
  const items = useToolKinds();
  return (
    <Box className="toolbar-story__box" data-orientation={orientation} data-extent="640" data-layout={layout}>
      <Toolbar label="Tool kinds" orientation={orientation} layout={layout} items={items} keyBadges={keyBadges} inlineOptions={inlineOptions} />
    </Box>
  );
};

export { ToolbarKindsDemo };
