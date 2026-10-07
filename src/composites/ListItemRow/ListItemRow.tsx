/* @layer renderer-components @kind component */
import { useContext } from 'react';
import type { MouseEvent } from 'react';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { ListItemContext } from './behavior/list-item-context';
import { rowActivate } from './behavior/row-activate';
import { rowFrame } from './behavior/row-frame';
import { ListItemBody } from './sub-components/ListItemBody';
import './ListItemRow.css';
import type { ListItemRowProps } from './ListItemRow.type';

const ListItemRow = (props: ListItemRowProps) => {
  const { name, meta, icon, columns, action, actionVisibility = 'always', selected = false, tabIndex, onClick, onDoubleClick, data } = props;
  const list = useContext(ListItemContext);
  const interactive = onClick !== undefined || onDoubleClick !== undefined;
  const frame = rowFrame(props, list, interactive);
  const body = <ListItemBody name={name} meta={meta} icon={icon} columns={columns} />;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => rowActivate({ onClick, onDoubleClick }, event.detail);

  return (
    <Box className={frame.className} role={frame.role} style={frame.style} {...data}>
      {interactive ? (
        <Pressable
          className="list-item-row__main"
          aria-pressed={selected}
          tabIndex={tabIndex}
          onClick={handleClick}
          onDoubleClick={onDoubleClick}
        >
          {body}
        </Pressable>
      ) : body}
      {action != null && <Box className={`list-item-row__action list-item-row__action--${actionVisibility}`}>{action}</Box>}
    </Box>
  );
};

export { ListItemRow };
