/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Grid } from '../../primitives/Grid';
import { Span } from '../../primitives/text-elements';
import type { PressedGridProps } from './PressedGrid.type';
import './PressedGrid.css';

const PressedGrid = (props: PressedGridProps) => {
  const { items, pressed, className = '' } = props;
  const down = new Set(pressed);

  return (
    <Grid gap="xs" className={`pressed-grid${className ? ` ${className}` : ''}`}>
      {items.map(({ id, label, title }) => (
        <Box key={id} title={title ?? id} className="pressed-grid__cell" data-pressed={down.has(id) ? '' : undefined}>
          <Span className="pressed-grid__label">{label ?? id}</Span>
        </Box>
      ))}
    </Grid>
  );
};

export { PressedGrid };
