/* @layer renderer-components @kind util */
const jumpNavigate = (onJump: ((id: string) => void) | undefined, id: string): (() => void) | undefined =>
  onJump ? () => onJump(id) : undefined;

export { jumpNavigate };
