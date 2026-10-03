/* @layer renderer-components @kind types */
import type { IconLook } from '../Icon/Icon.type';
import type { INPUT_ICONS } from './InputIcon.constants';

type InputIconFamily = keyof typeof INPUT_ICONS;

type InputIconName<F extends InputIconFamily = InputIconFamily> = Extract<keyof (typeof INPUT_ICONS)[F], string>;

type InputIconSource = { [F in InputIconFamily]: { family: F; name: InputIconName<F> } }[InputIconFamily];

type InputIconTone = 'color' | 'theme';

type GamepadIcons = { readonly [F in InputIconFamily]: Readonly<Record<string, InputIconName<F>>> };

type InputIconEntry = string | { width: number; height: number; body: string };

type InputIconProps = IconLook & InputIconSource & {
  tone?: InputIconTone;
};

export type { GamepadIcons, InputIconEntry, InputIconFamily, InputIconName, InputIconProps, InputIconSource, InputIconTone };
