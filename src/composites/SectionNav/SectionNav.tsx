/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { PathIcon } from '../../primitives/PathIcon';
import { Text } from '../../primitives/Text';
import { CHEVRON_RIGHT, GLYPH_BOX } from './SectionNav.constants';
import { SectionNavItem } from './sub-components/SectionNavItem';
import { SectionNavTop } from './sub-components/SectionNavTop';
import type { SectionNavProps } from './SectionNav.type';
import './SectionNav.css';

const SectionNav = (props: SectionNavProps) => {
  const { config, activeId, onSelect, search, defaultOpen = false, className = '' } = props;
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box as="nav" className={`section-nav${open ? ' section-nav--open' : ''}${className ? ` ${className}` : ''}`} aria-label="Sections">
      <Box className="section-nav__panel">
        <Pressable
          className="section-nav__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Collapse navigation' : 'Expand navigation'}
        >
          <PathIcon paths={[CHEVRON_RIGHT]} viewBox={GLYPH_BOX} size={14} />
        </Pressable>

        <SectionNavTop
          home={config.home}
          search={search}
          open={open}
          onOpen={() => setOpen(true)}
          activeId={activeId}
          onSelect={onSelect}
        />

        <Box className="section-nav__groups">
          {config.groups.map((group) => (
            <Box key={group.id} className="section-nav__group" role="group" aria-label={group.label}>
              <Text as="span" className="section-nav__group-label">{group.label}</Text>
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
