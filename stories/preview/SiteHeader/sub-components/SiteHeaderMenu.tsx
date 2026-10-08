/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { DropdownMenu } from '../../../../src/composites';
import type { MenuGroup } from '../../../../src/composites';
import { HamburgerIcon } from '../../../../src/composites/DropdownMenu/sub-components/HamburgerIcon';
import { Box, IconButton } from '../../../../src/primitives';
import { goTo } from '../behavior/go-to';
import { SITE_HEADER_STRINGS } from '../site-header-strings.constants';
import type { SiteHeaderMenuProps } from '../SiteHeader.type';

const SiteHeaderMenu = (props: SiteHeaderMenuProps) => {
  const { links, activeId, navigate } = props;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const groups: MenuGroup[] = [{
    id: 'links',
    items: links.map((link) => ({
      id: link.id,
      label: link.label,
      kind: 'radio',
      checked: link.id === activeId,
      onSelect: () => goTo(link.href, navigate),
    })),
  }];
  return (
    <Box className="site-header__menu">
      <IconButton ref={buttonRef} variant="ghost" label={SITE_HEADER_STRINGS.menu} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <HamburgerIcon open={open} />
      </IconButton>
      {open && <DropdownMenu groups={groups} anchorRef={buttonRef} align="end" label={SITE_HEADER_STRINGS.menu} onClose={() => setOpen(false)} />}
    </Box>
  );
};

export { SiteHeaderMenu };
