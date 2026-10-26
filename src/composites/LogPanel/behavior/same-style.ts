/* @layer renderer-components @kind logic */
import type { AnsiStyle } from './ansi.type';

const sameStyle = (a: AnsiStyle, b: AnsiStyle): boolean =>
  a.fg === b.fg && a.bg === b.bg && a.bold === b.bold && a.dim === b.dim && a.italic === b.italic && a.underline === b.underline;

export { sameStyle };
