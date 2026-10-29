/* @layer stories @kind types */
type InlineEditArgs = {
  initial: string;
  placeholder: string;
  multiline: boolean;
  disabled: boolean;
  validated: boolean;
  link: boolean;
  dense: boolean;
};

interface InlineEditDemoProps {
  initial?: string;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  disabled?: boolean;
  validated?: boolean;
  link?: boolean;
  dense?: boolean;
  markdown?: boolean;
}

export type { InlineEditArgs, InlineEditDemoProps };
