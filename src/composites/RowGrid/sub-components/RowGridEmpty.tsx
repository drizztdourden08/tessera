/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { EmptyState } from '../../../primitives/EmptyState';
import { Icon } from '../../../primitives/Icon';
import type { RowGridEmptyProps } from '../RowGrid.type';
import './RowGridEmpty.css';

const RowGridEmpty = ({ message, onAdd, addLabel }: RowGridEmptyProps) => (
  <EmptyState
    size="sm"
    className="row-grid__empty"
    icon={<Icon name="rows-3" size={20} />}
    message={message}
    action={onAdd && (
      <Button size="sm" variant="secondary" icon={<Icon name="plus" size={14} />} className="row-grid__add" onClick={onAdd}>
        {addLabel}
      </Button>
    )}
  />
);

export { RowGridEmpty };
