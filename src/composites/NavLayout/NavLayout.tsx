/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SideNav } from '../SideNav';
import { keepSearchOnEscape } from './behavior/keep-search-on-escape';
import { paneScrolls } from './behavior/pane-scrolls';
import { useNavFilter } from './behavior/useNavFilter';
import { useNavSearch } from './behavior/useNavSearch';
import { NavLayoutPane } from './sub-components/NavLayoutPane';
import type { NavLayoutProps } from './NavLayout.type';
import './NavLayout.css';

const NavLayout = (props: NavLayoutProps) => {
  const { nav, children, results, filterable, filterPlaceholder, paneScroll = 'page', compact = false, className = '', ref } = props;
  const shown = useNavFilter(nav, filterable, filterPlaceholder);
  const { search, searching } = useNavSearch(shown.search);
  const showResults = searching && results !== undefined;
  const classes = ['nav-layout', compact ? 'nav-layout--compact' : '', className].filter(Boolean).join(' ');

  return (
    <Box ref={ref} className={classes} onKeyDown={keepSearchOnEscape(shown.search?.value ?? '')}>
      <SideNav {...shown} overlay={compact} search={search} activeId={showResults ? '' : nav.activeId} />
      <NavLayoutPane scroll={paneScrolls(paneScroll, showResults)}>{showResults ? results : children}</NavLayoutPane>
    </Box>
  );
};

export { NavLayout };
