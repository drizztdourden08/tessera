/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import type { RowGridFootProps } from '../RowGrid.type';
import './RowGridFoot.css';

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
