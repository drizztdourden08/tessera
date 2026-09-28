/* @layer renderer-components @kind types */
interface ChannelInputProps {
  label: string;
  value: number;
  max: number;
  onCommit: (n: number) => void;
}

export type { ChannelInputProps };
