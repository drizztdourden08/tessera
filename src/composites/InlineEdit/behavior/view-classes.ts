/* @layer renderer-components @kind util */
import type { ViewClassesInput } from './view-classes.type';

const viewClasses = ({ multiline, dense, look, className }: ViewClassesInput): string => [
  'inline-edit__view',
  multiline && 'inline-edit__view--multiline',
  dense && !multiline && 'inline-edit__view--dense',
  look === 'link' && 'inline-edit__view--link',
  className,
].filter(Boolean).join(' ');

export { viewClasses };
