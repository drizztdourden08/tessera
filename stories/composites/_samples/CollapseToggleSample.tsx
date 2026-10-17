/* @layer stories @kind component */
import { useId, useState } from 'react';
import { CollapseToggle } from '../../../src/composites';
import { Box, Paragraph } from '../../../src/primitives';
import { COLLAPSE_TEXT as T } from './collapse-toggle-story.constants';
import type { CollapseToggleSampleProps } from './collapse-toggle-story.type';

const CollapseToggleSample = ({ side = 'start', folded = false }: CollapseToggleSampleProps) => {
  const [collapsed, setCollapsed] = useState(folded);
  const id = useId();
  const panel = (
    <Box id={id} surface="sunken" className={collapsed ? 'collapse-story__panel collapse-story__panel--folded' : 'collapse-story__panel'}>
      <CollapseToggle
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        label={T.panel}
        side={side}
        controls={id}
        className={`collapse-story__toggle collapse-story__toggle--${side}`}
      />
      {!collapsed && <Paragraph tone="dim">{T.body}</Paragraph>}
    </Box>
  );
  return (
    <Box className="collapse-story">
      {side === 'start' && panel}
      <Box surface="sunken" className="collapse-story__main"><Paragraph tone="dim">{T.main}</Paragraph></Box>
      {side === 'end' && panel}
    </Box>
  );
};

export { CollapseToggleSample };
