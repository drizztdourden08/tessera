/* @layer renderer-components @kind logic */
import type { MarkLabelProps } from './markLabelProps.type';

const markLabelProps = (label: string): MarkLabelProps => (
  label
    ? { role: 'img', 'aria-label': label, 'aria-hidden': undefined }
    : { role: undefined, 'aria-label': undefined, 'aria-hidden': true }
);

export { markLabelProps };
