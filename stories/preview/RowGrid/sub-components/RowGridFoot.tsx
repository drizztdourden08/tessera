/* @layer stories @kind component */
import { Box, Button, Icon, Span } from '../../../../src/primitives';
import type { RowGridFootProps } from '../RowGrid.type';

const RowGridFoot = ({ onAdd, addLabel, summary }: RowGridFootProps) => (
  <Box className="row-grid__foot">
    {onAdd && (
      <Button size="sm" variant="ghost" icon={<Icon name="plus" size={14} />} className="row-grid__add" onClick={onAdd}>
        {addLabel}
      </Button>
    )}
    {summary != null && <Span className="row-grid__summary">{summary}</Span>}
  </Box>
);

export { RowGridFoot };
