/* @layer renderer-components @kind component */
import { useCallback, useRef } from 'react';
import { EmptyState } from '../../primitives/EmptyState';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ManagedList } from '../ManagedList';
import { MasterDetailLayout } from '../MasterDetailLayout';
import { guardMessage } from './behavior/guard-message';
import { useDirtyGuard } from './behavior/useDirtyGuard';
import type { MasterDetailMove, MasterDetailProps } from './MasterDetail.type';
import { MasterDetailGuardBar } from './sub-components/MasterDetailGuardBar';
import { MasterDetailGuardDialog } from './sub-components/MasterDetailGuardDialog';
import './MasterDetail.css';

const MasterDetail = <T,>(props: MasterDetailProps<T>) => {
  const { list, selectedId, onSelect, detail, emptyDetail, dirty = false, onSave, onDiscard, guard: look = 'inline', className, ...layout } = props;
  const strings = useTesseraStrings();
  const stayRef = useRef<HTMLButtonElement>(null);
  const { onCreate } = list;
  const perform = useCallback((move: MasterDetailMove) => {
    if (move.kind === 'select') onSelect(move.id);
    else if (move.kind === 'back') onSelect(null);
    else onCreate?.();
  }, [onSelect, onCreate]);
  const guard = useDirtyGuard({ dirty, onSave, onDiscard, perform });
  const words = guardMessage(strings, list, selectedId, guard.pending);
  const guardProps = {
    open: guard.pending !== null, ...words, saving: guard.saving, onStay: guard.stay, onDiscard: guard.discard, onSave: guard.save, stayRef,
  };
  const empty = selectedId === null;
  return (
    <>
      <MasterDetailLayout
        {...layout}
        className={className ? `master-detail-editor ${className}` : 'master-detail-editor'}
        list={(
          <ManagedList
            {...list}
            selectedId={selectedId}
            onSelect={(id) => (id === selectedId ? undefined : guard.request({ kind: 'select', id }))}
            onCreate={onCreate ? () => guard.request({ kind: 'create' }) : undefined}
          />
        )}
        detail={empty ? (emptyDetail ?? <EmptyState message={strings.lists.pickItem} />) : (
          <>
            {look === 'inline' && <MasterDetailGuardBar {...guardProps} />}
            {detail}
          </>
        )}
        detailEmpty={empty}
        onBack={() => guard.request({ kind: 'back' })}
      />
      {look === 'dialog' && <MasterDetailGuardDialog {...guardProps} />}
    </>
  );
};

export { MasterDetail };
