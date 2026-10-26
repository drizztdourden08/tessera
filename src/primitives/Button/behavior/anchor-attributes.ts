/* @layer renderer-components @kind util */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { BUTTON_ONLY } from './anchor-attributes.constants';

const anchorAttributes = (attributes: ButtonHTMLAttributes<HTMLButtonElement>, inert: boolean): AnchorHTMLAttributes<HTMLAnchorElement> => {
  const kept: Record<string, unknown> = { ...attributes };
  for (const key of BUTTON_ONLY) delete kept[key];
  if (inert) delete kept.onClick;
  return kept;
};

export { anchorAttributes };
