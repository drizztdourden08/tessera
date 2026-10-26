/* @layer renderer-components @kind component */
import { useContext, useRef } from 'react';
import type { MouseEvent } from 'react';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { ListItemContext } from './behavior/list-item-context';
import { rowActivate } from './behavior/row-activate';
import { rowFrame } from './behavior/row-frame';
import { useMediaWidth } from './behavior/useMediaWidth';
import { useNameAnchor } from './behavior/useNameAnchor';
import { ListItemBody } from './sub-components/ListItemBody';
import '../../theme/row-inset.css';
import './ListItemRow.css';
import '../../theme/list-item-slots.css';
import type { ListItemRowProps } from './ListItemRow.type';

const ListItemRow = (props: ListItemRowProps) => {
  const { name, meta, icon, media, columns, action, actionVisibility = 'always', nameAction, selected = false, tabIndex, onClick, onDoubleClick, onContextMenu, onKeyDown, data } = props;
  const list = useContext(ListItemContext);
  const rowRef = useRef<HTMLElement>(null);
  const interactive = onClick !== undefined || onDoubleClick !== undefined;
  const frame = rowFrame(props, list, interactive);
  const mediaStyle = useMediaWidth(rowRef, { media, aspect: props.mediaAspect, width: props.mediaWidth });
  const anchorStyle = useNameAnchor(nameAction != null);
  const style = mediaStyle || anchorStyle ? { ...frame.style, ...mediaStyle, ...anchorStyle } : frame.style;
  const body = <ListItemBody name={name} meta={meta} icon={icon} media={media} columns={columns} />;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => rowActivate({ onClick, onDoubleClick }, event.detail);

  return (
    <Box ref={rowRef} className={frame.className} role={frame.role} style={style} {...(interactive ? {} : { onContextMenu, onKeyDown })} {...data}>
      {interactive ? (
        <Pressable
          className="list-item-row__main row-inset"
          aria-pressed={selected}
          tabIndex={tabIndex}
          onClick={handleClick}
          onDoubleClick={onDoubleClick}
          onContextMenu={onContextMenu}
          onKeyDown={onKeyDown}
        >
          {body}
        </Pressable>
      ) : body}
      {nameAction != null && <Box className="list-item-row__name-action">{nameAction}</Box>}
      {action != null && <Box className={`list-item-row__action list-item-row__action--${actionVisibility}`}>{action}</Box>}
    </Box>
  );
};

export { ListItemRow };
