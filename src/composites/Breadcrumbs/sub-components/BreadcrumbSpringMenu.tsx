/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { groupSiblings } from '../behavior/group-siblings';
import type { BreadcrumbSpringMenuProps } from '../Breadcrumbs.type';

const BreadcrumbSpringMenu = ({ anchorRef, label, siblings, onClose }: BreadcrumbSpringMenuProps) => {
  const { navigation } = useTesseraStrings();

  return <DropdownMenu anchorRef={anchorRef} groups={groupSiblings(siblings)} label={navigation.siblingsOf(label)} variant="ghost" onClose={onClose} />;
};

export { BreadcrumbSpringMenu };
