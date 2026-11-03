/* @layer renderer-components @kind component */
import { Grid } from '../../primitives/Grid';
import { MEDIA_GRID_MIN_WIDTH } from './MediaGrid.constants';
import type { MediaGridProps } from './MediaGrid.type';
import { MediaGridCell } from './sub-components/MediaGridCell';
import './MediaGrid.css';

const MediaGrid = (props: MediaGridProps) => {
  const { items, onOpen, columns, empty, className, 'aria-label': ariaLabel } = props;
  if (items.length === 0) return <>{empty}</>;
  return (
    <Grid
      role="list"
      aria-label={ariaLabel}
      className={className ? `media-grid ${className}` : 'media-grid'}
      columns={columns}
      minColWidth={columns ? undefined : MEDIA_GRID_MIN_WIDTH}
      gap="sm"
    >
      {items.map((item, index) => (
        <MediaGridCell key={`${index}-${item.src}`} item={item} index={index} onOpen={onOpen} />
      ))}
    </Grid>
  );
};

export { MediaGrid };
