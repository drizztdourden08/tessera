/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { Icon } from '../../primitives/Icon';
import { ScrollArea } from '../../primitives/ScrollArea';
import { Span } from '../../primitives/text-elements';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { leadRow } from './behavior/lead-row';
import { navClassName } from './behavior/nav-class-name';
import { usePanelOpen } from './behavior/usePanelOpen';
import { SideNavItem } from './sub-components/SideNavItem';
import { SideNavTop } from './sub-components/SideNavTop';
import type { SideNavProps } from './SideNav.type';
import './SideNav.css';

const SideNav = (props: SideNavProps) => {
  const {
    config, activeId, onSelect, search, defaultOpen = false, variant = 'panel', collapsed = false, overlay = false, ariaLabel,
    className = '',
  } = props;
  const { navigation } = useTesseraStrings();
  const rail = variant === 'rail';
  const { navRef, toggleRef, open, floating, toggle, openPanel, select } = usePanelOpen({ rail, collapsed, defaultOpen, overlay, onSelect });
  const classes = navClassName({ variant, open, overlay: floating, lead: leadRow(config, search, open), className });

  return (
    <Box as="nav" ref={navRef} className={classes} aria-label={ariaLabel ?? navigation.sections}>
      <Box className="side-nav__panel">
        {!rail && (
          <Pressable
            ref={toggleRef}
            className="side-nav__toggle"
            onClick={toggle}
            aria-expanded={open}
            aria-label={open ? navigation.collapseNavigation : navigation.expandNavigation}
          >
            <Icon name="chevron-right" size={14} />
          </Pressable>
        )}

        <SideNavTop
          home={config.home}
          search={search}
          open={open}
          onOpen={openPanel}
          activeId={activeId}
          onSelect={select}
        />

        <ScrollArea scrollbar="slim" className="side-nav__groups">
          {config.groups.map((group) => (
            <Box key={group.id} className="side-nav__group" role="group" aria-label={group.label}>
              {group.label ? <Span tone="muted" className="side-nav__group-label">{group.label}</Span> : null}
              {group.items.map((item) => (
                <SideNavItem key={item.id} item={item} active={item.id === activeId} onSelect={select} />
              ))}
            </Box>
          ))}
        </ScrollArea>
      </Box>
    </Box>
  );
};

export { SideNav };
