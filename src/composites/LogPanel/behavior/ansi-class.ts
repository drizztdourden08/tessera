/* @layer renderer-components @kind logic */
import { ANSI_NAMES, BRIGHT_OFFSET } from './ansi.constants';
import type { AnsiStyle } from './ansi.type';

const ansiClass = (style: AnsiStyle): string => {
  const fg = style.fg === null ? undefined : ANSI_NAMES[style.fg];
  const bg = style.bg === null ? undefined : ANSI_NAMES[style.bg % BRIGHT_OFFSET];
  return [
    fg && `log-panel__ansi--fg-${fg}`,
    bg && `log-panel__ansi--bg-${bg}`,
    style.bold && 'log-panel__ansi--bold',
    style.dim && 'log-panel__ansi--dim',
    style.italic && 'log-panel__ansi--italic',
    style.underline && 'log-panel__ansi--underline',
  ].filter(Boolean).join(' ');
};

export { ansiClass };
