/* @layer renderer-components @kind types */
import type { IconLook } from '../Icon/Icon.type';
import type { INPUT_ICON_FAMILIES } from './behavior/input-icon-families.constants';
import type { INPUT_ICON_NAMES } from './behavior/input-icon-names.constants';

type InputIconFamily = (typeof INPUT_ICON_FAMILIES)[number];

type InputIconName<F extends InputIconFamily = InputIconFamily> = (typeof INPUT_ICON_NAMES)[F][number];

type InputIconSource = { [F in InputIconFamily]: { family: F; name: InputIconName<F> } }[InputIconFamily];

type InputIconTone = 'color' | 'theme';

type GamepadIcons = { readonly [F in InputIconFamily]: Readonly<Record<string, InputIconName<F>>> };

type InputIconEntry = string | { width: number; height: number; body: string };

type InputIconSet<F extends InputIconFamily> = Readonly<Record<InputIconName<F>, InputIconEntry>>;

type InputIconProps = IconLook & InputIconSource & {
  tone?: InputIconTone;
};

export type {
  GamepadIcons, InputIconEntry, InputIconFamily, InputIconName, InputIconProps, InputIconSet, InputIconSource, InputIconTone,
};
