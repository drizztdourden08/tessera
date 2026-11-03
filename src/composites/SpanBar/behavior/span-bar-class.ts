/* @layer renderer-components @kind logic */
import { tagHueClass } from '../../../primitives/tag-hue/tag-hue-class';
import type { SpanBarProps } from '../SpanBar.type';

const spanBarClass = (colour: SpanBarProps['colour'], className: string | undefined): string =>
  ['span-bar', tagHueClass(colour), className].filter(Boolean).join(' ');

export { spanBarClass };
