/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { SideNavItem } from './SideNavItem';
import { SideNavSearch } from './SideNavSearch';
import type { SideNavTopProps } from './SideNavTop.type';

const SideNavTop = (props: SideNavTopProps) => {
  const { home, search, open, onOpen, activeId, onSelect } = props;
  if (home === undefined && search === undefined) return null;
  return (
    <Box className="side-nav__top">
      {search && <SideNavSearch search={search} open={open} onOpen={onOpen} />}
      {search && home && <Box className="side-nav__split" aria-hidden="true" />}
      {home && <SideNavItem item={home} active={home.id === activeId} onSelect={onSelect} />}
    </Box>
  );
};

export { SideNavTop };
