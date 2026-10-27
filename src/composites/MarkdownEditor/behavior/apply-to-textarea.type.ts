/* @layer renderer-components @kind types */
interface CommandDocument {
  execCommand?: (command: string, showUi?: boolean, value?: string) => boolean;
}

export type { CommandDocument };
