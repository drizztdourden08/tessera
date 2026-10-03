/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SideNav } from '../SideNav';
import { keepSearchOnEscape } from './behavior/keep-search-on-escape';
import { paneScrolls } from './behavior/pane-scrolls';
import { useNavSearch } from './behavior/useNavSearch';
import { SideNavLayoutPane } from './sub-components/SideNavLayoutPane';
import type { SideNavLayoutProps } from './SideNavLayout.type';
import './SideNavLayout.css';

const SideNavLayout = (props: SideNavLayoutProps) => {
  const { nav, children, results, paneScroll = 'page', narrow = false, className = '', ref } = props;
  const { search, searching } = useNavSearch(nav.search);
  const showResults = searching && results !== undefined;
  const classes = ['side-nav-layout', narrow ? 'side-nav-layout--narrow' : '', className].filter(Boolean).join(' ');

  return (
    <Box ref={ref} className={classes} onKeyDown={keepSearchOnEscape(nav.search?.value ?? '')}>
      <SideNav {...nav} overlay={narrow} search={search} activeId={showResults ? '' : nav.activeId} />
      <SideNavLayoutPane scroll={paneScrolls(paneScroll, showResults)}>{showResults ? results : children}</SideNavLayoutPane>
    </Box>
  );
};

export { SideNavLayout };
