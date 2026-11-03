/* @layer renderer-components @kind logic */
const barClassName = (inline: boolean, className: string | undefined): string => ['anchored-bar', inline ? 'anchored-bar--inline' : '', className].filter(Boolean).join(' ');

export { barClassName };
