/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { HamburgerIcon } from './HamburgerIcon';
import type { MenuTriggerGlyphProps } from './MenuTriggerGlyph.type';

const MenuTriggerGlyph = (props: MenuTriggerGlyphProps) => {
  const { icon, open } = props;
  if (icon === 'hamburger') return <HamburgerIcon open={open} />;
  return typeof icon === 'string' ? <Icon name={icon} /> : icon;
};

export { MenuTriggerGlyph };
