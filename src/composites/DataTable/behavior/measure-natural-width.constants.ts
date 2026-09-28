/* @layer renderer-components @kind data */
const HOST_STYLE = [
  'position: fixed',
  'top: -100vh',
  'left: 0',
  'visibility: hidden',
  'pointer-events: none',
].join('; ');

const CLONE_STYLE = [
  'position: static',
  'display: block',
  'width: max-content',
  'min-width: 0',
  'max-width: none',
  'flex: none',
  'transform: none',
].join('; ');

export { CLONE_STYLE, HOST_STYLE };
