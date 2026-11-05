/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { RecordCardHeaderProps } from './RecordCardHeader.type';
import { RecordCardSlot } from './RecordCardSlot';

const RecordCardHeader = (props: RecordCardHeaderProps) => {
  const { title, icon, code, content, menu, expandable, expanded, bodyId, onToggle } = props;
  const { navigation } = useTesseraStrings();
  return (
    <Box className="record-card__header">
      <RecordCardSlot when={expandable}>
        <IconButton variant="ghost" size="sm" label={expanded ? navigation.collapseItem : navigation.expandItem} aria-expanded={expanded} aria-controls={bodyId} onClick={onToggle}>
          <Icon name="chevron-right" className={expanded ? 'record-card__chevron record-card__chevron--open' : 'record-card__chevron'} aria-hidden />
        </IconButton>
      </RecordCardSlot>
      <RecordCardSlot when={icon != null}>{icon}</RecordCardSlot>
      <RecordCardSlot when={code != null}>
        <Text variant="caption" mono>{code}</Text>
      </RecordCardSlot>
      <RecordCardSlot main>
        {!expanded && <Text variant="label" className="record-card__title">{title}</Text>}
        {content}
      </RecordCardSlot>
      <RecordCardSlot when={menu != null}>{menu}</RecordCardSlot>
    </Box>
  );
};

export { RecordCardHeader };
