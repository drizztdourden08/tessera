/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { RecordHeaderChevron as RecordHeaderChevronProps } from '../RecordHeader.type';

const RecordHeaderChevron = ({ expanded, onToggle, controls, label }: RecordHeaderChevronProps) => {
  const { navigation } = useTesseraStrings();
  const name = label ?? (expanded ? navigation.collapseItem : navigation.expandItem);
  return (
    <IconButton variant="ghost" size="sm" label={name} aria-expanded={expanded} aria-controls={controls} onClick={onToggle}>
      <Icon name="chevron-right" className={expanded ? 'record-header__chevron record-header__chevron--open' : 'record-header__chevron'} aria-hidden />
    </IconButton>
  );
};

export { RecordHeaderChevron };
