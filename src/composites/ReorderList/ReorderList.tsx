/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { EmptyState } from '../../primitives/EmptyState';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import '../../theme/visually-hidden.css';
import { useReorderList } from './behavior/useReorderList';
import { CHORD_KEYS } from './ReorderList.constants';
import type { ReorderListProps } from './ReorderList.type';
import { ReorderRow } from './sub-components/ReorderRow';
import './ReorderList.css';

const ReorderList = (props: ReorderListProps) => {
  const { label, items, toggles = [], selectedId, onSelect, onToggle, empty, className } = props;
  const { reorderList } = useTesseraStrings();
  const hintId = useId();
  const { listRef, drag, message, tabId, onKeyDown, onFocus } = useReorderList(props);
  if (items.length === 0) return <EmptyState size="sm" className="reorder-list__empty" message={empty ?? reorderList.empty} />;
  return (
    <Box className={['reorder-list', className].filter(Boolean).join(' ')}>
      <Box
        as="ul"
        ref={listRef}
        className="reorder-list__items"
        aria-label={label}
        aria-describedby={hintId}
        aria-keyshortcuts={CHORD_KEYS}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
      >
        {items.map((item, index) => (
          <ReorderRow
            key={item.id}
            item={item}
            index={index}
            total={items.length}
            toggles={toggles}
            selected={item.id === selectedId}
            tabbable={item.id === tabId}
            drag={drag}
            onSelect={onSelect}
            onToggle={onToggle}
          />
        ))}
      </Box>
      <Box id={hintId} className="visually-hidden">{reorderList.moveHint}</Box>
      <Box className="visually-hidden" aria-live="polite">{message}</Box>
    </Box>
  );
};

export { ReorderList };
