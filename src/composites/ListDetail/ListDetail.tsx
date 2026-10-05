/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ItemList } from '../ItemList';
import { ListDetailLayout } from '../ListDetailLayout';
import { guardMessage } from './behavior/guard-message';
import { useListDetailGuard } from './behavior/useListDetailGuard';
import type { ListDetailProps } from './ListDetail.type';
import { ListDetailGuardBar } from './sub-components/ListDetailGuardBar';
import { ListDetailGuardDialog } from './sub-components/ListDetailGuardDialog';
import './ListDetail.css';

const ListDetail = <T,>(props: ListDetailProps<T>) => {
  const { list, selectedId, detail, guard: look = 'inline', className, ...rest } = props;
  const { onSelect: _onSelect, dirty: _dirty, onSave: _onSave, onDiscard: _onDiscard, ...layout } = rest;
  const strings = useTesseraStrings();
  const stayRef = useRef<HTMLButtonElement>(null);
  const { guard, items, back } = useListDetailGuard(props);
  const words = guardMessage(strings, list, selectedId, guard.pending);
  const guardProps = {
    open: guard.pending !== null, ...words, saving: guard.saving, onStay: guard.stay, onDiscard: guard.discard, onSave: guard.save, stayRef,
  };
  return (
    <>
      <ListDetailLayout
        {...layout}
        className={className ? `list-detail ${className}` : 'list-detail'}
        list={<ItemList {...items} />}
        detail={selectedId !== null && (
          <>
            {look === 'inline' && <ListDetailGuardBar {...guardProps} />}
            {detail}
          </>
        )}
        onBack={back}
      />
      {look === 'dialog' && <ListDetailGuardDialog {...guardProps} />}
    </>
  );
};

export { ListDetail };
