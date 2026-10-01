/* @layer renderer-components @kind types */
interface BackdropGlow {
  colour: string;
  strength: number;
  at: readonly [x: number, y: number];
  size: readonly [width: number, height: number];
}

interface BackdropGradient {
  glows: readonly BackdropGlow[];
  angle: number;
  stops: readonly [from: string, to: string];
}

export type { BackdropGlow, BackdropGradient };
