/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SideNavSearch } from '../../SideNav/sub-components/SideNavSearch';
import type { SideNavLayoutBarProps } from './SideNavLayoutBar.type';

const keepOpen = () => undefined;

const SideNavLayoutBar = (props: SideNavLayoutBarProps) => {
  const { barRef, buttonRef, drawerId, open, onToggle, search, current } = props;
  const { navigation } = useTesseraStrings();
  const label = open ? navigation.collapseNavigation : navigation.expandNavigation;

  return (
    <Box ref={barRef} className="side-nav-layout__bar">
      <IconButton
        ref={buttonRef}
        variant="secondary"
        size="md"
        label={label}
        title={label}
        aria-expanded={open}
        aria-controls={drawerId}
        className="side-nav-layout__menu"
        onClick={onToggle}
      >
        <Icon name={open ? 'x' : 'menu'} size={18} />
      </IconButton>
      {search !== undefined && <SideNavSearch search={search} open onOpen={keepOpen} />}
      {search === undefined && current !== undefined && (
        <Box className="side-nav-layout__current">
          <Box as="span" className="side-nav-layout__current-icon" aria-hidden="true">{current.icon}</Box>
          <Span className="side-nav-layout__current-label">{current.label}</Span>
        </Box>
      )}
    </Box>
  );
};

export { SideNavLayoutBar };
