/* @layer renderer-components @kind types */
type BackdropToken = `--${string}`;

interface BackdropGlow {
  token: BackdropToken;
  strength: number;
  at: readonly [x: number, y: number];
  reach: number;
}

interface BackdropGradient {
  glows: readonly BackdropGlow[];
  angle: number;
  stops: readonly [from: BackdropToken, to: BackdropToken];
}

export type { BackdropGlow, BackdropGradient, BackdropToken };
