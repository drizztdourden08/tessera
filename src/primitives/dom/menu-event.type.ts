/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEvent } from 'react';

type MenuEvent = MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;

type MenuKeyEvent = Pick<KeyboardEvent, 'key' | 'shiftKey' | 'ctrlKey' | 'altKey' | 'metaKey'>;

export type { MenuEvent, MenuKeyEvent };
