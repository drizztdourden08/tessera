/* @layer renderer-components @kind component */
import { useCallback, useRef } from 'react';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ItemList } from '../ItemList';
import { ListDetailLayout } from '../ListDetailLayout';
import { guardMessage } from './behavior/guard-message';
import { useDirtyGuard } from './behavior/useDirtyGuard';
import type { ListDetailMove, ListDetailProps } from './ListDetail.type';
import { ListDetailGuardBar } from './sub-components/ListDetailGuardBar';
import { ListDetailGuardDialog } from './sub-components/ListDetailGuardDialog';
import './ListDetail.css';

const ListDetail = <T,>(props: ListDetailProps<T>) => {
  const { list, selectedId, onSelect, detail, dirty = false, onSave, onDiscard, guard: look = 'inline', className, ...layout } = props;
  const strings = useTesseraStrings();
  const stayRef = useRef<HTMLButtonElement>(null);
  const { onCreate } = list;
  const perform = useCallback((move: ListDetailMove) => {
    if (move.kind === 'select') onSelect(move.id);
    else if (move.kind === 'back') onSelect(null);
    else onCreate?.();
  }, [onSelect, onCreate]);
  const guard = useDirtyGuard({ dirty, onSave, onDiscard, perform });
  const words = guardMessage(strings, list, selectedId, guard.pending);
  const guardProps = {
    open: guard.pending !== null, ...words, saving: guard.saving, onStay: guard.stay, onDiscard: guard.discard, onSave: guard.save, stayRef,
  };
  return (
    <>
      <ListDetailLayout
        {...layout}
        className={className ? `list-detail ${className}` : 'list-detail'}
        list={(
          <ItemList
            {...list}
            selectedId={selectedId}
            onSelect={(id) => (id === selectedId ? undefined : guard.request({ kind: 'select', id }))}
            onCreate={onCreate ? () => guard.request({ kind: 'create' }) : undefined}
          />
        )}
        detail={selectedId !== null && (
          <>
            {look === 'inline' && <ListDetailGuardBar {...guardProps} />}
            {detail}
          </>
        )}
        onBack={() => guard.request({ kind: 'back' })}
      />
      {look === 'dialog' && <ListDetailGuardDialog {...guardProps} />}
    </>
  );
};

export { ListDetail };
