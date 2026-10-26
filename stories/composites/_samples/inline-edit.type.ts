/* @layer stories @kind types */
type InlineEditArgs = {
  initial: string;
  placeholder: string;
  multiline: boolean;
  disabled: boolean;
  validated: boolean;
};

interface InlineEditDemoProps {
  initial?: string;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  disabled?: boolean;
  validated?: boolean;
}

export type { InlineEditArgs, InlineEditDemoProps };
