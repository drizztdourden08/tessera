/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { SEPARATOR_SIZE } from '../Breadcrumbs.constants';
import type { BreadcrumbOverflowProps } from '../Breadcrumbs.type';

const BreadcrumbOverflow = ({ hidden, onNavigate }: BreadcrumbOverflowProps) => {
  const { navigation } = useTesseraStrings();
  const items = hidden.map((segment) => ({ id: segment.id, label: segment.label, icon: segment.icon, onSelect: () => onNavigate(segment.id) }));

  return (
    <Box as="li" className="breadcrumbs__item breadcrumbs__item--overflow">
      <Icon name="chevron-right" size={SEPARATOR_SIZE} className="breadcrumbs__separator" aria-hidden />
      <DropdownMenu
        trigger={{ label: navigation.hiddenLevels, icon: 'ellipsis', iconOnly: true }}
        groups={[{ id: 'hidden', items }]}
        label={navigation.hiddenLevels}
        variant="ghost"
        size="xs"
        className="breadcrumbs__overflow"
      />
    </Box>
  );
};

export { BreadcrumbOverflow };
