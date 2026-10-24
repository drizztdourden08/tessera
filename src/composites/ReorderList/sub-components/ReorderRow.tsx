/* @layer renderer-components @kind component */
import type { MouseEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import '../../../theme/row-rename.css';
import { ListItemRow } from '../../ListItemRow';
import { mainOf } from '../../reorder/main-of';
import { doubleClickAction } from '../behavior/double-click-action';
import { LABEL_SELECTOR } from '../ReorderList.constants';
import type { ReorderRowProps } from '../ReorderList.type';
import { ReorderGrip } from './ReorderGrip';
import { ReorderRename } from './ReorderRename';
import { ReorderToggles } from './ReorderToggles';
import './ReorderRow.css';

const ReorderRow = (props: ReorderRowProps) => {
  const { item, index, total, toggles, selected, tabbable, drag, edit, mediaAspect, mediaWidth, onSelect, onToggle } = props;
  const { renaming, can, onRenameStart, onRenameEnd, onActivate } = edit;
  const onDoubleClick = (event: MouseEvent<HTMLElement>): void => {
    const target = event.target;
    if (!isHTMLElement(target)) return;
    const action = doubleClickAction({ main: mainOf(event.currentTarget)?.contains(target) ?? false, label: target.closest(LABEL_SELECTOR) !== null }, can);
    if (action === 'activate') onActivate?.(item.id);
    else if (action === 'rename') onRenameStart(item.id);
  };
  return (
    <Box
      as="li"
      className="reorder-list__item"
      data-reorder-index={index}
      data-reorder-key={item.id}
      data-drop={drag.dropMark(index, total)}
      data-dragging={drag.dragging === index ? 'yes' : undefined}
      onDoubleClick={onDoubleClick}
    >
      <ReorderGrip index={index} drag={drag} />
      <ListItemRow
        className={renaming ? 'reorder-list__row row-rename' : 'reorder-list__row'}
        name={renaming ? <ReorderRename name={item.label} onEnd={(name) => onRenameEnd(item.id, name)} /> : item.label}
        icon={item.icon && <Icon name={item.icon} size={16} />}
        media={item.media}
        mediaAspect={mediaAspect}
        mediaWidth={mediaWidth}
        selected={selected}
        tabIndex={tabbable ? 0 : -1}
        onClick={renaming ? undefined : () => onSelect?.(item.id)}
        action={toggles.length > 0 ? (
          <ReorderToggles name={item.label} toggles={toggles} state={item.toggles} onToggle={(toggleId, next) => onToggle?.(item.id, toggleId, next)} />
        ) : undefined}
      />
    </Box>
  );
};

export { ReorderRow };
