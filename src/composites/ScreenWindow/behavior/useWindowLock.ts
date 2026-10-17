/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import { readStored } from '../../../primitives/dom/read-stored';
import { writeStored } from '../../../primitives/dom/write-stored';
import type { Rect } from '../../rect-drag/rect-drag.type';
import { useOpenState } from '../../SideNav/behavior/useOpenState';
import { LOCKED_KEY_SUFFIX, RECT_KEY_SUFFIX } from '../ScreenWindow.constants';
import type { ScreenWindowProps, WindowLock } from '../ScreenWindow.type';
import { storedRect } from './stored-rect';

const keyOf = (storageKey: string | undefined, suffix: string): string | undefined =>
  (storageKey === undefined ? undefined : `${storageKey}${suffix}`);

const useWindowLock = (props: ScreenWindowProps, bare: boolean): WindowLock => {
  const { movable = false, locked, defaultLocked = true, onLockChange, defaultRect, onRectChange, minSize, storageKey } = props;
  const [isLocked, setLocked] = useOpenState({ open: locked, defaultOpen: defaultLocked, onOpenChange: onLockChange, storageKey: keyOf(storageKey, LOCKED_KEY_SUFFIX) });
  const rectKey = keyOf(storageKey, RECT_KEY_SUFFIX);
  const [rect, setRect] = useState<Rect | null>(() => readStored(rectKey, storedRect) ?? defaultRect ?? null);
  const onChange = useCallback((next: Rect) => {
    setRect(next);
    writeStored(rectKey, next);
    onRectChange?.(next);
  }, [onRectChange, rectKey]);
  const toggle = useCallback(() => setLocked((was) => !was), [setLocked]);
  const shown = bare && movable;
  return { shown, locked: isLocked, toggle, move: shown && !isLocked ? { rect, min: minSize, onChange } : undefined };
};

export { useWindowLock };
