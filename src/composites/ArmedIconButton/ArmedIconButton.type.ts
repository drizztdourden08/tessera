/* @layer renderer-components @kind types */
import type { ArmedIconName } from '../../primitives/ArmedIcon/ArmedIcon.type';
import type { IconButtonSize } from '../../primitives/IconButton/IconButton.type';
import type { ACCENT_TONES, STATUS_TONES } from '../../primitives/TextElement/TextElement.constants';

type ArmedIconButtonTone = (typeof ACCENT_TONES)[number] | (typeof STATUS_TONES)[number];

interface ArmedIconButtonProps {
  icon: ArmedIconName;
  label: string;
  armedLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onArm?: () => void;
  tone?: ArmedIconButtonTone;
  timeout?: number | false;
  size?: IconButtonSize;
  disabled?: boolean;
  defaultArmed?: boolean;
  tabIndex?: number;
  className?: string;
}

export type { ArmedIconButtonProps, ArmedIconButtonTone };
