/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import type { MenuGroup } from '../../DropdownMenu';
import { goTo } from '../behavior/go-to';
import type { SiteHeaderMenuProps } from './SiteHeaderLinks.type';

const SiteHeaderMenu = (props: SiteHeaderMenuProps) => {
  const { links, activeId, navigate } = props;
  const { navigation } = useTesseraStrings();
  const groups: MenuGroup[] = [{
    id: 'links',
    items: links.map((link) => ({
      id: link.id,
      label: link.label,
      kind: 'radio',
      checked: link.id === activeId,
      onSelect: () => goTo(link, navigate),
    })),
  }];
  return (
    <Box className="site-header__menu">
      <DropdownMenu trigger={{ label: navigation.menu, icon: 'hamburger', iconOnly: true }} variant="ghost" groups={groups} />
    </Box>
  );
};

export { SiteHeaderMenu };
