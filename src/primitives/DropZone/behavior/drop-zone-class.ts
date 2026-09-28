/* @layer renderer-components @kind util */
const dropZoneClass = (inline: boolean, active: boolean, disabled: boolean): string =>
  [
    'dropzone',
    inline && 'dropzone--inline',
    active && 'dropzone--active',
    disabled && 'dropzone--disabled',
  ].filter(Boolean).join(' ');

export { dropZoneClass };
