/* @layer renderer-components @kind types */
import type { ButtonVariant } from '../../primitives/Button/Button.type';

type CopyButtonSize = 'xs' | 'sm' | 'md';

type CopyText = string | (() => string);

interface CopyButtonProps {
  text: CopyText;
  label?: string;
  copiedLabel?: string;
  showLabel?: boolean;
  variant?: ButtonVariant;
  size?: CopyButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onCopied?: () => void;
  className?: string;
}

type CopyButtonControlProps = Pick<CopyButtonProps, 'showLabel' | 'variant' | 'size' | 'disabled' | 'loading'> & {
  name: string;
  copied: boolean;
  onClick: () => void;
};

export type { CopyButtonControlProps, CopyButtonProps, CopyButtonSize, CopyText };
