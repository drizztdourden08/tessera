/* @layer stories @kind component */
import { useState } from 'react';
import type { MenuVariant } from '../../../src/composites';
import { HamburgerIcon } from '../../../src/composites/DropdownMenu/sub-components/HamburgerIcon';
import { IconButton } from '../../../src/primitives';

const MorphToggle = ({ variant, open }: { variant: MenuVariant; open?: boolean }) => {
  const [flipped, setFlipped] = useState(false);
  const expanded = open ?? flipped;
  return (
    <IconButton variant={variant} size="sm" label="Menu" aria-expanded={expanded} onClick={open === undefined ? () => setFlipped(!flipped) : undefined}>
      <HamburgerIcon />
    </IconButton>
  );
};

export { MorphToggle };
