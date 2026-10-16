/* @layer stories @kind component */
import { useId, useState } from 'react';
import { Box, Icon, IconButton, Text } from '../../../../src/primitives';
import type { StudioPanelProps } from '../StudioLayout.type';

const StudioPanel = (props: StudioPanelProps) => {
  const { side, spec } = props;
  const { title, content, defaultFolded = false } = spec;
  const [folded, setFolded] = useState(defaultFolded);
  const bodyId = useId();
  const label = folded ? `Show ${title}` : `Hide ${title}`;
  const classes = ['studio-layout__panel', `studio-layout__panel--${side}`, folded && 'studio-layout__panel--folded'];

  return (
    <Box as="aside" surface="raised" aria-label={title} className={classes.filter(Boolean).join(' ')}>
      <Box className="studio-layout__panel-head">
        <Text as="h2" variant="overline" tone="muted" className="studio-layout__panel-title">{title}</Text>
        <IconButton variant="ghost" size="sm" label={label} title={label} aria-expanded={!folded} aria-controls={bodyId} onClick={() => setFolded(!folded)}>
          <Icon name={side === 'start' ? 'panel-left' : 'panel-right'} />
        </IconButton>
      </Box>
      {!folded && <Box id={bodyId} className="studio-layout__panel-body">{content}</Box>}
    </Box>
  );
};

export { StudioPanel };
