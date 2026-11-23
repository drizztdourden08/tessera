/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { recordHeaderClass } from './behavior/record-header-class';
import { recordHeaderRow } from './behavior/record-header-row';
import type { RecordHeaderProps } from './RecordHeader.type';
import { RecordHeaderChevron } from './sub-components/RecordHeaderChevron';
import { RecordHeaderIconSwap } from './sub-components/RecordHeaderIconSwap';
import { RecordHeaderSlot } from './sub-components/RecordHeaderSlot';
import './RecordHeader.css';

const RecordHeader = (props: RecordHeaderProps) => {
  const { title, icon, code, content, menu, chevron, chevronOnIcon, density, className } = props;
  const toggle = chevron?.onToggle;
  const swap = chevronOnIcon === true && chevron != null && icon != null;
  return (
    <Box className={recordHeaderClass(density ?? 'card', className, toggle != null)} {...recordHeaderRow(toggle)}>
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
