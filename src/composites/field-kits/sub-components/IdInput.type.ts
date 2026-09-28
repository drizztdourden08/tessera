/* @layer renderer-components @kind types */
interface IdInputProps {
  placeholder: string;
  value: unknown;
  disabled?: boolean;
  onChange: (value: unknown) => void;
}

export type { IdInputProps };
