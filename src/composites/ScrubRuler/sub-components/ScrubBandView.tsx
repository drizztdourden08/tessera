/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { spanBox } from '../../cell-geometry';
import type { ScrubBandViewProps } from './ScrubBandView.type';

const ScrubBandView = ({ cells, total, band, draft, title, onClear }: ScrubBandViewProps) => {
  const box = spanBox(cells, { start: band.from, end: band.to }, total);
  const placed = { '--scrub-left': `${box.left}px`, '--scrub-width': `${box.width}px` } as CSSProperties;
  return (
    <Box className="scrub-ruler__band" style={placed} data-draft={draft || undefined}>
      {onClear && !draft && (
        <IconButton size="xs" variant="quiet" label={title} title={title} className="scrub-ruler__clear" onClick={onClear}>
          <Icon name="x" />
        </IconButton>
      )}
    </Box>
  );
};

export { ScrubBandView };
