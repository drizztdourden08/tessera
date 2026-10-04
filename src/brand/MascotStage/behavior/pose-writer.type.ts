/* @layer renderer-components @kind types */
/** What one part shows this frame from the action layer: its transform list and its opacity. */
interface PartOutput {
  transform: string;
  opacity: number;
  fades: boolean;
}

interface PoseWriter {
  /**
   * Draws a blended frame. Tracked parts are held by a paused animation that adds onto the running ambient
   * clip (composite add), exactly as the clips themselves add; other parts get their opacity as an attribute.
   */
  write: (outputs: ReadonlyMap<string, PartOutput>, tracked: ReadonlySet<string>) => void;
  /** Lets go of every held part, when a clip takes over and plays on its own. */
  release: () => void;
  /** Sets the resting look of the extras: those listed are drawn, the rest are hidden (opacity 0). */
  base: (shown: ReadonlySet<string>) => void;
  /** Takes extras that no running clip uses out of the drawing (display none), as the approved playback did. */
  park: (inUse: ReadonlySet<string>) => void;
  /** Turns upright extras back when the mascot faces left. */
  mirror: (flipped: boolean) => void;
  dispose: () => void;
}

interface PartSlot {
  elements: readonly SVGElement[];
  holders: (Animation | undefined)[];
  key: string;
  effect: boolean;
  parked: boolean;
  /** The opacity attribute now on the elements: the base the held animation adds to. */
  attr: number;
}

export type { PartOutput, PartSlot, PoseWriter };
