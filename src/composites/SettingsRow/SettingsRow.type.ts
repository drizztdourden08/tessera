/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ActionData } from '../../primitives/action-data';
import type { ShortcutKey } from '../../primitives/Shortcut/Shortcut.type';
import type { PatternSetup, PatternValue } from '../DynamicInput/DynamicInput.type';

interface SettingsOption {
  value: string;
  label: string;
  hint?: string;
}

interface SettingsInputBase<K extends string, V> {
  kind: K;
  value: V;
  onChange: (value: V) => void;
}

interface SettingsToggleInput extends SettingsInputBase<'toggle', boolean> {
  hints?: { on?: string; off?: string };
}

interface SettingsChoiceInput<K extends string> extends SettingsInputBase<K, string> {
  options: readonly SettingsOption[];
}

interface SettingsSelectInput extends SettingsChoiceInput<'select'> {
  searchable?: boolean;
}

interface SettingsMultiInput extends SettingsInputBase<'multi', readonly string[]> {
  options: readonly SettingsOption[];
}

interface SettingsSliderInput extends SettingsInputBase<'slider', number> {
  min: number;
  max: number;
  step?: number;
  stops?: readonly string[];
  formatValue?: (value: number) => string;
  hintOf?: (value: number) => string | undefined;
}

interface SettingsNumberInput extends SettingsInputBase<'number', number> {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface SettingsTextInput<K extends string> extends SettingsInputBase<K, string> {
  placeholder?: string;
}

interface SettingsDynamicInput extends SettingsInputBase<'dynamic', PatternValue>, PatternSetup {
  pattern: string;
  text?: (value: PatternValue) => string;
}

interface SettingsTagsInput extends SettingsInputBase<'tags', readonly string[]> {
  suggestions?: readonly string[];
  placeholder?: string;
}

interface SettingsCustomInput {
  kind: 'custom';
  control: ReactNode;
  text?: ReactNode;
}

type SettingsInput =
  | SettingsToggleInput
  | SettingsSelectInput
  | SettingsChoiceInput<'segmented'>
  | SettingsChoiceInput<'radio'>
  | SettingsMultiInput
  | SettingsSliderInput
  | SettingsNumberInput
  | SettingsTextInput<'text'>
  | SettingsTextInput<'password'>
  | SettingsDynamicInput
  | SettingsInputBase<'color', string>
  | SettingsInputBase<'keybind', readonly ShortcutKey[]>
  | SettingsTagsInput
  | SettingsCustomInput;

type SettingsInputKind = SettingsInput['kind'];

type SettingsInputOf<K extends SettingsInputKind> = Extract<SettingsInput, { kind: K }>;

interface SettingsRowAction extends ActionData<'danger'> {
  id: string;
  icon?: ReactNode;
  loading?: boolean;
}

type SettingsDescription =
  | { description: string; noDescription?: never }
  | { noDescription: true; description?: never };

interface SettingsItemFields {
  id: string;
  title: string;
  hint: string;
  keywords?: string;
  input?: SettingsInput;
  actions?: readonly SettingsRowAction[];
  disabled?: boolean;
  lock?: string | null;
  changed?: boolean;
  onReset?: () => void;
  problem?: ReactNode;
  badge?: ReactNode;
  descriptionLines?: number;
}

type SettingsItem = SettingsItemFields & SettingsDescription;

interface SettingsRowLook {
  compact?: boolean;
  readOnly?: boolean;
  flash?: boolean;
  className?: string;
}

type SettingsRowProps = SettingsItem & SettingsRowLook;

export type {
  SettingsDescription, SettingsInput, SettingsInputKind, SettingsInputOf, SettingsItem, SettingsOption, SettingsRowAction, SettingsRowLook,
  SettingsRowProps,
};
