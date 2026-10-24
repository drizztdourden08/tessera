/* @layer renderer-components @kind types */
import type { IconifyIcon } from '@iconify/types';
import type { ControlSize } from '../../primitives/field-control/field-control.type';
import type { IconName } from '../../primitives/Icon/Icon.type';

type PatternSlotValue = number | string | null;

type PatternValue = Readonly<Record<string, PatternSlotValue>>;

interface PatternChoice {
  readonly value: string;
  readonly label?: string;
  readonly short?: string;
  readonly flag?: string;
  readonly detail?: string;
  readonly [field: string]: string | undefined;
}

type PatternAliases = Readonly<Record<string, string>>;

type PatternRuleMessage = string | null | undefined;

interface PatternSlotConfig {
  label?: string;
  placeholder?: string;
  chars?: string | ReadonlySet<string>;
  aliases?: PatternAliases;
  validate?: (value: PatternSlotValue) => PatternRuleMessage;
}

interface PatternAction {
  label: string;
  icon?: IconName;
  disabled?: boolean;
  onPress: (value: PatternValue) => void;
}

type PatternLists = Readonly<Record<string, readonly PatternChoice[]>>;

type PatternActions = Readonly<Record<string, PatternAction>>;

type PatternIcons = Readonly<Record<string, IconifyIcon>>;

type PatternSlotConfigs = Readonly<Record<string, PatternSlotConfig>>;

interface PatternSetup {
  slots?: PatternSlotConfigs;
  lists?: PatternLists;
  actions?: PatternActions;
  icons?: PatternIcons;
  counter?: string;
  aliases?: PatternAliases;
  validate?: (value: PatternValue) => PatternRuleMessage;
}

interface DynamicInputProps extends PatternSetup {
  pattern: string;
  value: PatternValue;
  onChange: (next: PatternValue) => void;
  disabled?: boolean;
  invalid?: boolean;
  size?: ControlSize;
  id?: string;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export type {
  DynamicInputProps, PatternAction, PatternActions, PatternAliases, PatternChoice, PatternIcons, PatternLists, PatternRuleMessage,
  PatternSetup, PatternSlotConfig, PatternSlotConfigs, PatternSlotValue, PatternValue,
};
