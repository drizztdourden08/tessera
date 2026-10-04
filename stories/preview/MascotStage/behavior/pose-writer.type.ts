/* @layer stories @kind types */
interface PartOutput {
  transform: string;
  opacity: number;
  fades: boolean;
}

interface PoseWriter {
  write: (outputs: ReadonlyMap<string, PartOutput>, tracked: ReadonlySet<string>) => void;
  release: () => void;
  base: (shown: ReadonlySet<string>) => void;
  park: (inUse: ReadonlySet<string>) => void;
  mirror: (flipped: boolean) => void;
  dispose: () => void;
}

interface PartSlot {
  elements: readonly SVGElement[];
  holders: (Animation | undefined)[];
  key: string;
  effect: boolean;
  parked: boolean;
  attr: number;
}

export type { PartOutput, PartSlot, PoseWriter };
