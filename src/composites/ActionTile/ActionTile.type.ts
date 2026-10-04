/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ButtonVariant } from '../../primitives/Button/Button.type';
import type { IconName } from '../../primitives/Icon';
import type { StatusTone } from '../../primitives/Status';

type ActionTileSize = 'sm' | 'md';

interface ActionTileAction {
  label: string;
  onSelect: () => void;
  icon?: IconName;
  variant?: Extract<ButtonVariant, 'primary' | 'secondary' | 'danger'>;
  disabled?: boolean;
}

interface ActionTileIconAction {
  label: string;
  icon: IconName;
  onSelect: () => void;
  disabled?: boolean;
}

interface ActionTileStatus {
  label: string;
  tone: StatusTone;
}

interface ActionTileProps {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  meta?: ReactNode;
  icon?: IconName;
  status?: ActionTileStatus;
  tone?: StatusTone;
  action?: ActionTileAction;
  tools?: readonly ActionTileIconAction[];
  onOpen?: () => void;
  openLabel?: string;
  size?: ActionTileSize;
  className?: string;
}

export type { ActionTileAction, ActionTileIconAction, ActionTileProps, ActionTileSize, ActionTileStatus };
