/* @layer renderer-components @kind types */
interface MoveFocus {
  message: string;
  announce: (message: string) => void;
  expect: (id: string) => void;
}

export type { MoveFocus };
