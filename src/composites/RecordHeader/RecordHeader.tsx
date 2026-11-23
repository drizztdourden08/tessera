/* @layer renderer-components @kind component */
import type { MouseEvent } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { isInteractiveTarget } from '../../primitives/dom/is-interactive-target';
import { recordHeaderClass } from './behavior/record-header-class';
import type { RecordHeaderProps } from './RecordHeader.type';
import { RecordHeaderChevron } from './sub-components/RecordHeaderChevron';
import { RecordHeaderIconSwap } from './sub-components/RecordHeaderIconSwap';
import { RecordHeaderSlot } from './sub-components/RecordHeaderSlot';
import './RecordHeader.css';

const RecordHeader = (props: RecordHeaderProps) => {
  const { title, icon, code, content, menu, chevron, chevronOnIcon = false, density = 'card', className } = props;
  const toggle = chevron?.onToggle;
  const swap = chevronOnIcon && chevron != null && icon != null;
  const onRowClick = (event: MouseEvent<HTMLElement>) => {
    if (toggle && !isInteractiveTarget(event.target, event.currentTarget)) toggle();
  };
  return (
    <Box className={recordHeaderClass(density, className, toggle != null)} onClick={toggle ? onRowClick : undefined} data-row-toggle={toggle ? '' : undefined}>
      <RecordHeaderSlot when={chevron != null && !swap}>{chevron && <RecordHeaderChevron {...chevron} />}</RecordHeaderSlot>
      <RecordHeaderSlot when={icon != null}>{swap ? <RecordHeaderIconSwap icon={icon} chevron={chevron} /> : icon}</RecordHeaderSlot>
      <RecordHeaderSlot when={code != null} code>
        <Text variant="caption" mono className="record-header__code">{code}</Text>
      </RecordHeaderSlot>
      <RecordHeaderSlot when={title != null} main>
        <Text variant="label" className="record-header__title">{title}</Text>
      </RecordHeaderSlot>
      <RecordHeaderSlot when={content != null} content>{content}</RecordHeaderSlot>
      <RecordHeaderSlot when={menu != null} menu>{menu}</RecordHeaderSlot>
    </Box>
  );
};

export { RecordHeader };
