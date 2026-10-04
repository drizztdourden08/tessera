/* @layer renderer-components @kind logic */
import type { InputIconFamily, InputIconSource } from '../InputIcon.type';
import { KEY_CODE } from './gamepad-input-icon.constants';
import { GAMEPAD_INPUT_ICONS } from './gamepad-input-icons.constants';
import { isInputIconName } from './is-input-icon-name';

const keyName = (id: string): string | undefined => {
  const match = KEY_CODE.exec(id);
  return (match?.[1] ?? match?.[2])?.toLowerCase();
};

const gamepadInputIcon = (family: InputIconFamily, id: string): InputIconSource | null => {
  const names: Readonly<Record<string, string>> = GAMEPAD_INPUT_ICONS[family];
  const listed = Object.hasOwn(names, id) ? names[id] : undefined;
  const name = listed ?? (family === 'keyboard' ? keyName(id) : undefined);
  return name !== undefined && isInputIconName(family, name) ? ({ family, name } as InputIconSource) : null;
};

export { gamepadInputIcon };
