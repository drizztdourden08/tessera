/* @layer renderer-components @kind types */
interface Director {
  tick: (now: number) => void;
}

export type { Director };
