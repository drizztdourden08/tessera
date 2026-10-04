/* @layer renderer-components @kind component */
import { useId, useMemo, useRef, useState } from 'react';
import { MenuContext } from '../behavior/menu-context';
import { menuColumns } from '../behavior/menu-columns';
import { menuMatches } from '../behavior/menu-matches';
import { MenuFilter } from './MenuFilter';
import { MenuGroups } from './MenuGroups';
import { MenuPanel } from './MenuPanel';
import { MenuResults } from './MenuResults';
import type { MenuRootProps } from './MenuRoot.type';

const MenuRoot = (props: MenuRootProps) => {
  const { groups, label, start, closeOnSelect, look, filter, filterPlaceholder, onClose, onQueryChange } = props;
  const ownId = useId();
  const id = props.id ?? ownId;
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const context = useMemo(() => ({ close: onClose, closeOnSelect, look }), [onClose, closeOnSelect, look]);
  const matches = useMemo(() => menuMatches(groups, query), [groups, query]);
  const searching = filter && query.trim() !== '';
  const toFilter = filter ? () => inputRef.current?.focus() : undefined;
  const columns = menuColumns(searching ? matches.map((match) => match.item) : groups.flatMap((group) => group.items));

  return (
    <MenuContext value={context}>
      {filter && (
        <MenuFilter
          inputRef={inputRef}
          menuRef={menuRef}
          menuId={id}
          value={query}
          placeholder={filterPlaceholder}
          autoFocus={start !== 'none'}
          empty={searching && matches.length === 0}
          onChange={(next) => {
            setQuery(next);
            onQueryChange?.(next);
          }}
          onExit={onClose}
        />
      )}
      <MenuPanel id={id} label={label} start={filter ? 'none' : start} columns={columns} menuRef={menuRef} onExit={onClose} onTop={toFilter} onType={toFilter}>
        {searching ? <MenuResults matches={matches} query={query} /> : <MenuGroups groups={groups} />}
      </MenuPanel>
    </MenuContext>
  );
};

export { MenuRoot };
