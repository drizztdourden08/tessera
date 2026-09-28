/* @layer renderer-components @kind component */
import { useState, useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { TextInput } from '../../primitives/TextInput';
import { GroupTitle } from './sub-components/GroupTitle';
import type { SideNavProps } from './SideNav.type';
import '../../theme/glass-panel.css';
import './SideNav.css';

const SideNav = (props: SideNavProps) => {
  const { groups, activeId, onSelect, searchable = false, searchPlaceholder = 'Filter...', header, query, onQueryChange } = props;
  const controlled = query !== undefined;
  const [innerQuery, setInnerQuery] = useState('');
  const value = controlled ? query : innerQuery;
  const q = value.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (controlled || !q) return groups;
    return groups
      .map(g => ({ ...g, items: g.items.filter(i => i.label.toLowerCase().includes(q)) }))
      .filter(g => g.items.length > 0 || (g.id !== undefined && (g.title ?? '').toLowerCase().includes(q)));
  }, [controlled, groups, q]);

  const onInput = (next: string) => (controlled ? onQueryChange?.(next) : setInnerQuery(next));

  return (
    <Box as="nav" className="side-nav glass-panel">
      {header && <Box className="side-nav__header">{header}</Box>}
      {searchable && (
        <Box className="side-nav__search">
          <TextInput value={value} onChange={e => onInput(e.target.value)} placeholder={searchPlaceholder} />
        </Box>
      )}
      <Box className="side-nav__list">
        {filtered.map((group, gi) => (
          <Box key={group.id ?? group.title ?? gi} className="side-nav__group">
            {group.title && <GroupTitle group={group} activeId={activeId} onSelect={onSelect} />}
            {group.items.map(item => (
              <Pressable
                key={item.id}
                className={`side-nav__item${item.id === activeId ? ' side-nav__item--active' : ''}`}
                onClick={() => onSelect(item.id)}
              >
                {item.icon && <Box as="span" className="side-nav__icon">{item.icon}</Box>}
                {item.label}
              </Pressable>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { SideNav };
