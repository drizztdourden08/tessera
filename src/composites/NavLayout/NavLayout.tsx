/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ScrollArea } from '../../primitives/ScrollArea';
import { SectionNav } from '../SectionNav';
import { keepSearchOnEscape } from './behavior/keep-search-on-escape';
import { useNavSearch } from './behavior/useNavSearch';
import type { NavLayoutProps } from './NavLayout.type';
import './NavLayout.css';

const NavLayout = (props: NavLayoutProps) => {
  const { nav, children, results, compact = false, className = '', ref } = props;
  const { search, searching } = useNavSearch(nav.search);
  const showResults = searching && results !== undefined;
  const classes = ['nav-layout', compact ? 'nav-layout--compact' : '', className].filter(Boolean).join(' ');

  return (
    <Box ref={ref} className={classes} onKeyDown={keepSearchOnEscape(nav.search?.value ?? '')}>
      <SectionNav {...nav} overlay={compact} search={search} activeId={showResults ? '' : nav.activeId} />
      <ScrollArea className="nav-layout__pane">{showResults ? results : children}</ScrollArea>
    </Box>
  );
};

export { NavLayout };
