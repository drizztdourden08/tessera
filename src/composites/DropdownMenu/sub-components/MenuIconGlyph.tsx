/* @layer renderer-components @kind component */
import { isValidElement } from 'react';
import { Icon } from '../../../primitives/Icon';
import type { MenuIconGlyphProps } from './MenuIconGlyph.type';

const MenuIconGlyph = (props: MenuIconGlyphProps) => {
  const { icon } = props;
  if (typeof icon === 'string') return <Icon name={icon} />;
  if (isValidElement(icon)) return icon;
  return 'body' in icon ? <Icon icon={icon} /> : <Icon path={icon} />;
};

export { MenuIconGlyph };
