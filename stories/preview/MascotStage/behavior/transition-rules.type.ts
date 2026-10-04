/* @layer stories @kind types */
interface ClipRule {
  blendIn?: number;
  protect?: readonly [from: number, to: number];
  urgent?: boolean;
}

export type { ClipRule };
