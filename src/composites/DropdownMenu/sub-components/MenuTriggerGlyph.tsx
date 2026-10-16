/* @layer renderer-components @kind component */
import { HamburgerIcon } from './HamburgerIcon';
import { MenuIconGlyph } from './MenuIconGlyph';
import type { MenuTriggerGlyphProps } from './MenuTriggerGlyph.type';

const MenuTriggerGlyph = (props: MenuTriggerGlyphProps) => {
  const { icon } = props;
  if (icon === 'hamburger') return <HamburgerIcon />;
  return <MenuIconGlyph icon={icon} />;
};

export { MenuTriggerGlyph };
