/* @layer renderer-components @kind types */
interface InlineCreateNameProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  label?: string;
  errorId?: string;
}

export type { InlineCreateNameProps };
