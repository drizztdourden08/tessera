/* @layer stories @kind component */
import { useState } from 'react';
import { HamburgerIcon } from '../../../src/composites/DropdownMenu/sub-components/HamburgerIcon';
import { IconButton } from '../../../src/primitives';

const MorphToggle = ({ titleBar, open }: { titleBar: boolean; open?: boolean }) => {
  const [flipped, setFlipped] = useState(false);
  const expanded = open ?? flipped;
  return (
    <IconButton
      variant="primary"
      size="sm"
      label="Menu"
      className={titleBar ? 'window-title-bar__menu' : undefined}
      aria-expanded={expanded}
      onClick={open === undefined ? () => setFlipped(!flipped) : undefined}
    >
      <HamburgerIcon />
    </IconButton>
  );
};

export { MorphToggle };
