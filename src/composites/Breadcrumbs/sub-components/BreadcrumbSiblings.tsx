/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import type { BreadcrumbSiblingsProps } from '../Breadcrumbs.type';

const BreadcrumbSiblings = ({ label, siblings, named }: BreadcrumbSiblingsProps) => {
  const { navigation } = useTesseraStrings();
  const menuLabel = navigation.siblingsOf(label);

  return (
    <DropdownMenu
      trigger={named ? { label, icon: 'chevron-down', iconSide: 'end' } : { label: menuLabel, icon: 'chevron-down', iconOnly: true }}
      groups={[{ id: 'siblings', items: siblings }]}
      label={menuLabel}
      variant="ghost"
      size="xs"
      className={named ? 'breadcrumbs__segment-menu' : 'breadcrumbs__siblings'}
    />
  );
};

export { BreadcrumbSiblings };
