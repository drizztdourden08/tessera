/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { SideNav } from '../SideNav';
import { currentItem } from './behavior/current-item';
import { drawerNav } from './behavior/drawer-nav';
import { keepSearchOnEscape } from './behavior/keep-search-on-escape';
import { layoutClassName } from './behavior/layout-class-name';
import { paneScrolls } from './behavior/pane-scrolls';
import { useNavDrawer } from './behavior/useNavDrawer';
import { useNavSearch } from './behavior/useNavSearch';
import { SideNavLayoutBar } from './sub-components/SideNavLayoutBar';
import { SideNavLayoutPane } from './sub-components/SideNavLayoutPane';
import type { SideNavLayoutProps } from './SideNavLayout.type';
import './SideNavLayout.css';

const SideNavLayout = (props: SideNavLayoutProps) => {
  const { nav, children, results, paneScroll = 'page', narrow = false, className = '', ref } = props;
  const { search, searching } = useNavSearch(nav.search);
  const drawer = useNavDrawer(nav.onSelect);
  const drawerId = useId();
  const showResults = searching && results !== undefined;
  const activeId = showResults ? '' : nav.activeId;
  const searchKey = keepSearchOnEscape(nav.search?.value ?? '');

  return (
    <Box ref={ref} className={layoutClassName(narrow, drawer.open, className)} onKeyDown={searchKey}>
      <Box className="side-nav-layout__frame">
        <SideNavLayoutBar
          barRef={drawer.barRef}
          buttonRef={drawer.buttonRef}
          drawerId={drawerId}
          open={drawer.open}
          onToggle={drawer.toggle}
          search={drawer.compact ? search : undefined}
          current={currentItem(nav.config, activeId)}
        />
        <Box ref={drawer.drawerRef} id={drawerId} className="side-nav-layout__nav">
          <SideNav {...nav} overlay={narrow} search={search} activeId={activeId} {...drawerNav(drawer)} />
        </Box>
        <SideNavLayoutPane scroll={paneScrolls(paneScroll, showResults)}>{showResults ? results : children}</SideNavLayoutPane>
      </Box>
    </Box>
  );
};

export { SideNavLayout };
