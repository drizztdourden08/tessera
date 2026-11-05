/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { recordHeaderClass } from './behavior/record-header-class';
import type { RecordHeaderProps } from './RecordHeader.type';
import { RecordHeaderChevron } from './sub-components/RecordHeaderChevron';
import { RecordHeaderSlot } from './sub-components/RecordHeaderSlot';
import './RecordHeader.css';

const RecordHeader = (props: RecordHeaderProps) => {
  const { title, icon, code, content, menu, chevron, density = 'card', className } = props;
  return (
    <Box className={recordHeaderClass(density, className)}>
      <RecordHeaderSlot when={chevron != null}>{chevron && <RecordHeaderChevron {...chevron} />}</RecordHeaderSlot>
      <RecordHeaderSlot when={icon != null}>{icon}</RecordHeaderSlot>
      <RecordHeaderSlot when={code != null}>
        <Text variant="caption" mono>{code}</Text>
      </RecordHeaderSlot>
      <RecordHeaderSlot main>
        {title != null && <Text variant="label" className="record-header__title">{title}</Text>}
        {content}
      </RecordHeaderSlot>
      <RecordHeaderSlot when={menu != null}>{menu}</RecordHeaderSlot>
    </Box>
  );
};

export { RecordHeader };
