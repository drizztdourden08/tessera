/* @layer renderer-components @kind types */
interface AltTapKey {
  type: string;
  key: string;
  repeat?: boolean;
}

interface AltTap {
  armed: boolean;
  fire: boolean;
}

export type { AltTap, AltTapKey };
