/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { SectionNavItem } from './SectionNavItem';
import { SectionNavSearch } from './SectionNavSearch';
import type { SectionNavTopProps } from './SectionNavTop.type';

const SectionNavTop = (props: SectionNavTopProps) => {
  const { home, search, open, onOpen, activeId, onSelect } = props;
  if (home === undefined && search === undefined) return null;
  return (
    <Box className="section-nav__top">
      {search && <SectionNavSearch search={search} open={open} onOpen={onOpen} />}
      {search && home && <Box className="section-nav__split" aria-hidden="true" />}
      {home && <SectionNavItem item={home} active={home.id === activeId} onSelect={onSelect} />}
    </Box>
  );
};

export { SectionNavTop };
