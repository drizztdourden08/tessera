/* @layer renderer-components @kind logic */
import { INPUT_ICONS } from '../InputIcon.constants';
import type { InputIconFamily, InputIconSource } from '../InputIcon.type';
import { KEY_CODE } from './gamepad-input-icon.constants';
import { GAMEPAD_INPUT_ICONS } from './gamepad-input-icons.constants';

const keyName = (id: string): string | undefined => {
  const match = KEY_CODE.exec(id);
  const name = (match?.[1] ?? match?.[2])?.toLowerCase();
  return name && Object.hasOwn(INPUT_ICONS.keyboard, name) ? name : undefined;
};

const gamepadInputIcon = (family: InputIconFamily, id: string): InputIconSource | null => {
  const names: Readonly<Record<string, string>> = GAMEPAD_INPUT_ICONS[family];
  const listed = Object.hasOwn(names, id) ? names[id] : undefined;
  const name = listed ?? (family === 'keyboard' ? keyName(id) : undefined);
  return name === undefined ? null : ({ family, name } as InputIconSource);
};

export { gamepadInputIcon };
