/* @layer renderer-components @kind types */
interface AnsiStyle {
  fg: number | null;
  bg: number | null;
  bold: boolean;
  dim: boolean;
  italic: boolean;
  underline: boolean;
}

interface AnsiSpan extends AnsiStyle {
  text: string;
}

export type { AnsiSpan, AnsiStyle };
