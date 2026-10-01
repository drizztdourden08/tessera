/* @layer renderer-components @kind component */
import { Glyph } from '../../../primitives/Glyph';
import { Shortcut } from '../../../primitives/Shortcut';
import { Span } from '../../../primitives/text-elements';
import { menuShortcutKeys } from '../behavior/menu-shortcut-keys';
import type { MenuItemTrailProps } from './MenuItemTrail.type';

const MenuItemTrail = (props: MenuItemTrailProps) => {
  const { shortcut, checked } = props.item;
  return (
    <>
      {shortcut !== undefined && <Shortcut keys={menuShortcutKeys(shortcut)} className="dropdown__shortcut" aria-hidden="true" />}
      {checked === true && <Span className="dropdown__check"><Glyph name="check" /></Span>}
    </>
  );
};

export { MenuItemTrail };
