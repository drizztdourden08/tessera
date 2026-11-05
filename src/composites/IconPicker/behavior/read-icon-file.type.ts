/* @layer renderer-components @kind types */
import type { ICON_PICKER_STRINGS } from '../../../primitives/strings/icon-picker-strings.constants';
import type { IconPickerValue } from '../IconPicker.type';

type IconFileProblem = Exclude<keyof typeof ICON_PICKER_STRINGS, 'dialog' | 'search' | 'grid' | 'empty' | 'upload'>;

type IconFileResult = { value: IconPickerValue } | { problem: IconFileProblem };

export type { IconFileProblem, IconFileResult };
