/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import type { IconPath } from '../Icon.type';
import { PATH_ICON_VIEWBOX } from '../Icon.constants';

const attribute = (value: string | number): string => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const pathIconData = (path: IconPath): IconifyIcon => {
  const { d = [], circles = [], viewBox = PATH_ICON_VIEWBOX } = path;
  const [left = 0, top = 0, width = 16, height = 16] = viewBox.trim().split(/[\s,]+/).map(Number);
  const lines = typeof d === 'string' ? [d] : d;
  const body = [
    ...lines.map((line) => `<path d="${attribute(line)}"/>`),
    ...circles.map((c) => `<circle cx="${attribute(c.cx)}" cy="${attribute(c.cy)}" r="${attribute(c.r)}"/>`),
  ].join('');
  return { body, left, top, width, height };
};

export { pathIconData };
