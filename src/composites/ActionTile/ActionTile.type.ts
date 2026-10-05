/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ActionData } from '../../primitives/action-data';
import type { ButtonVariant } from '../../primitives/Button/Button.type';
import type { CopyText } from '../CopyButton/CopyButton.type';
import type { IconName } from '../../primitives/Icon/Icon.type';
import type { StatusTone } from '../../primitives/Status/Status.type';

type ActionTileSize = 'sm' | 'md';

type ActionTileTone = Extract<ButtonVariant, 'primary' | 'secondary' | 'danger'>;

interface ActionTileRun extends Omit<ActionData<ActionTileTone>, 'confirm' | 'onCancel'> {
  icon?: IconName;
  copy?: never;
}

interface ActionTileCopy {
  label: string;
  copy: CopyText;
  tone?: ActionTileTone;
  disabled?: boolean;
  onSelect?: never;
  icon?: never;
}

type ActionTileAction = ActionTileRun | ActionTileCopy;

interface ActionTileToolRun {
  label: string;
  icon: IconName;
  onSelect: () => void;
  disabled?: boolean;
  copy?: never;
}

interface ActionTileToolCopy {
  label: string;
  copy: CopyText;
  disabled?: boolean;
  onSelect?: never;
  icon?: never;
}

type ActionTileTool = ActionTileToolRun | ActionTileToolCopy;

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
  tools?: readonly ActionTileTool[];
  onOpen?: () => void;
  openLabel?: string;
  size?: ActionTileSize;
  className?: string;
}

type ActionTileHeadProps = Pick<ActionTileProps, 'label' | 'icon' | 'status' | 'onOpen' | 'openLabel'> & {
  labelId: string;
  tools: readonly ActionTileTool[];
};

interface ActionTileToolButtonProps {
  tool: ActionTileTool;
}

type ActionTileReadingProps = Pick<ActionTileProps, 'value' | 'unit' | 'tone'>;

interface ActionTileButtonProps {
  action: ActionTileAction;
}

export type {
  ActionTileAction, ActionTileButtonProps, ActionTileCopy, ActionTileHeadProps, ActionTileProps, ActionTileReadingProps, ActionTileRun, ActionTileSize,
  ActionTileStatus, ActionTileTool, ActionTileToolButtonProps, ActionTileTone, ActionTileToolCopy, ActionTileToolRun,
};
