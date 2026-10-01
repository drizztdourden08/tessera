/* @layer renderer-components @kind util */
import type { ControlSize } from '../../field-control/field-control.type';

const dropZoneClass = (size: ControlSize, inline: boolean, active: boolean, disabled: boolean): string =>
  [
    'dropzone',
    `control-size--${size}`,
    inline && 'dropzone--inline',
    active && 'dropzone--active',
    disabled && 'dropzone--disabled',
  ].filter(Boolean).join(' ');

export { dropZoneClass };
