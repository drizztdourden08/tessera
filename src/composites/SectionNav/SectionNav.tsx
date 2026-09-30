/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { Icon } from '../../primitives/Icon';
import { Span } from '../../primitives/text-elements';
import { navClassName } from './behavior/nav-class-name';
import { SectionNavItem } from './sub-components/SectionNavItem';
import { SectionNavTop } from './sub-components/SectionNavTop';
import type { SectionNavProps } from './SectionNav.type';
import './SectionNav.css';

const SectionNav = (props: SectionNavProps) => {
  const {
    config, activeId, onSelect, search, defaultOpen = false, variant = 'panel', collapsed = false, ariaLabel = 'Sections',
    className = '',
  } = props;
  const [panelOpen, setPanelOpen] = useState(defaultOpen);
  const rail = variant === 'rail';
  const open = rail ? !collapsed : panelOpen;

  return (
    <Box as="nav" className={navClassName(variant, open, className)} aria-label={ariaLabel}>
      <Box className="section-nav__panel">
        {!rail && (
          <Pressable
            className="section-nav__toggle"
            onClick={() => setPanelOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Collapse navigation' : 'Expand navigation'}
          >
            <Icon name="chevron-right" size={14} />
          </Pressable>
        )}

        <SectionNavTop
          home={config.home}
          search={search}
          open={open}
          onOpen={() => setPanelOpen(true)}
          activeId={activeId}
          onSelect={onSelect}
        />

        <Box className="section-nav__groups">
          {config.groups.map((group) => (
            <Box key={group.id} className="section-nav__group" role="group" aria-label={group.label}>
              {group.label ? <Span tone="muted" className="section-nav__group-label">{group.label}</Span> : null}
              {group.items.map((item) => (
                <SectionNavItem key={item.id} item={item} active={item.id === activeId} onSelect={onSelect} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export { SectionNav };
