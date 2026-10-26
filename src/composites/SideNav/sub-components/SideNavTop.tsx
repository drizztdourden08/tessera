/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { SideNavItem } from './SideNavItem';
import { SideNavSearch } from './SideNavSearch';
import type { SideNavTopProps } from './SideNavTop.type';

const SideNavTop = (props: SideNavTopProps) => {
  const { home, pages = [], search, open, onOpen, activeId, onSelect } = props;
  const rows = home ? [home, ...pages] : pages;
  if (rows.length === 0 && search === undefined) return null;
  return (
    <Box className="side-nav__top">
      {search && <SideNavSearch search={search} open={open} onOpen={onOpen} />}
      {search && rows.length > 0 && <Box className="side-nav__split" aria-hidden="true" />}
      {rows.map((row) => (
        <SideNavItem key={row.id} item={row} active={row.id === activeId} onSelect={onSelect} />
      ))}
    </Box>
  );
};

export { SideNavTop };
