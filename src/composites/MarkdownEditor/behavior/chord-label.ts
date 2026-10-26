/* @layer renderer-components @kind logic */
const onMac = (): boolean => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

const chordLabel = (key: string): string => `${onMac() ? 'Cmd' : 'Ctrl'}+${key}`;

export { chordLabel };
