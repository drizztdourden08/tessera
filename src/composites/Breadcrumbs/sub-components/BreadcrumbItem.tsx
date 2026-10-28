/* @layer renderer-components @kind component */
import '../../../theme/focus-ring.css';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import { DropdownMenu } from '../../DropdownMenu';
import { SEGMENT_ICON_SIZE, SEPARATOR_SIZE } from '../Breadcrumbs.constants';
import type { BreadcrumbItemProps } from '../Breadcrumbs.type';

const BreadcrumbItem = ({ segment, current, first, drop, onNavigate }: BreadcrumbItemProps) => {
  const { navigation } = useTesseraStrings();
  const { id, label, icon, siblings } = segment;

  return (
    <Box as="li" className="breadcrumbs__item" data-current={current || undefined}>
      {!first && <Icon name="chevron-right" size={SEPARATOR_SIZE} className="breadcrumbs__separator" aria-hidden />}
      <Pressable
        className="breadcrumbs__segment focus-ring-inset"
        aria-current={current ? 'page' : undefined}
        data-drop={drop.overId === id || undefined}
        onClick={() => onNavigate(id)}
        {...drop.bind(id)}
      >
        {icon !== undefined && <Icon name={icon} size={SEGMENT_ICON_SIZE} aria-hidden />}
        <Span className="breadcrumbs__label">{label}</Span>
      </Pressable>
      {siblings !== undefined && siblings.length > 0 && (
        <DropdownMenu
          trigger={{ label: navigation.siblingsOf(label), icon: 'chevron-down', iconOnly: true }}
          groups={[{ id: 'siblings', items: siblings }]}
          label={navigation.siblingsOf(label)}
          variant="ghost"
          size="xs"
          className="breadcrumbs__siblings"
        />
      )}
    </Box>
  );
};

export { BreadcrumbItem };
