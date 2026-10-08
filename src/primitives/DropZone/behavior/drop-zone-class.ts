/* @layer renderer-components @kind util */
import type { ControlSize } from '../../field-control/field-control.type';
import type { DropZoneLook } from './drop-zone-class.type';

const dropZoneClass = (size: ControlSize, look: DropZoneLook): string =>
  [
    'dropzone',
    `control-size--${size}`,
    look.inline && 'dropzone--inline',
    look.active && 'dropzone--active',
    look.disabled && 'dropzone--disabled',
    look.status && `dropzone--${look.status}`,
  ].filter(Boolean).join(' ');

export { dropZoneClass };
