/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { Icon } from '../../primitives/Icon';
import { Span } from '../../primitives/text-elements';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { navClassName } from './behavior/nav-class-name';
import { usePanelOpen } from './behavior/usePanelOpen';
import { SectionNavItem } from './sub-components/SectionNavItem';
import { SectionNavTop } from './sub-components/SectionNavTop';
import type { SectionNavProps } from './SectionNav.type';
import './SectionNav.css';

const SectionNav = (props: SectionNavProps) => {
  const {
    config, activeId, onSelect, search, defaultOpen = false, variant = 'panel', collapsed = false, overlay = false, ariaLabel,
    className = '',
  } = props;
  const { navigation } = useTesseraStrings();
  const rail = variant === 'rail';
  const { navRef, toggleRef, open, floating, toggle, openPanel, select } = usePanelOpen({ rail, collapsed, defaultOpen, overlay, onSelect });

  return (
    <Box as="nav" ref={navRef} className={navClassName(variant, open, floating, className)} aria-label={ariaLabel ?? navigation.sections}>
      <Box className="section-nav__panel">
        {!rail && (
          <Pressable
            ref={toggleRef}
            className="section-nav__toggle"
            onClick={toggle}
            aria-expanded={open}
            aria-label={open ? navigation.collapseNavigation : navigation.expandNavigation}
          >
            <Icon name="chevron-right" size={14} />
          </Pressable>
        )}

        <SectionNavTop
          home={config.home}
          search={search}
          open={open}
          onOpen={openPanel}
          activeId={activeId}
          onSelect={select}
        />

        <Box className="section-nav__groups">
          {config.groups.map((group) => (
            <Box key={group.id} className="section-nav__group" role="group" aria-label={group.label}>
              {group.label ? <Span tone="muted" className="section-nav__group-label">{group.label}</Span> : null}
              {group.items.map((item) => (
                <SectionNavItem key={item.id} item={item} active={item.id === activeId} onSelect={select} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export { SectionNav };
