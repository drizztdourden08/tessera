/* @layer renderer-components @kind component */
import type { KeyboardEvent, ReactNode } from 'react';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { rowClassName } from './behavior/row-class-name';
import './ListItemRow.css';
import type { ListItemRowProps } from './ListItemRow.type';

const ListItemRow = (props: ListItemRowProps) => {
  const { name, icon, meta, action, selected = false, onClick, onDoubleClick, role, className = '' } = props;
  const interactive = onClick !== undefined || onDoubleClick !== undefined;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' || !onDoubleClick) return;
    event.preventDefault();
    onDoubleClick();
  };

  const body: ReactNode = (
    <>
      {icon != null && <Text className="list-item-row__icon" aria-hidden>{icon}</Text>}
      <Box className="list-item-row__info">
        <Box className="list-item-row__name">{name}</Box>
        {meta != null && <Box className="list-item-row__meta">{meta}</Box>}
      </Box>
    </>
  );

  return (
    <Box
      className={rowClassName(selected, interactive, className)}
      role={role}
    >
      {interactive ? (
        <Pressable
          className="list-item-row__main"
          aria-pressed={selected}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onKeyDown={handleKeyDown}
        >
          {body}
        </Pressable>
      ) : body}
      {action != null && <Box className="list-item-row__action">{action}</Box>}
    </Box>
  );
};

export { ListItemRow };
