/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { TOOLBAR_START_KEYS } from '../ToolbarDock.constants';
import { listenToolbarKeys } from './listen-toolbar-keys';
import { measureToolbarFrame } from './measure-toolbar-frame';
import type { ToolbarDragParams, ToolbarDragView } from './toolbar-drag.type';
import { toolbarBasket } from './toolbar-basket';
import { toolbarHandleOf } from './toolbar-handle-of';
import type { ToolbarKeyEnd, ToolbarKeyLatest, ToolbarKeyNote, ToolbarKeySession } from './toolbar-key.type';
import { toolbarKeyFinish } from './toolbar-key-finish';
import { toolbarKeyMessage } from './toolbar-key-message';
import { toolbarKeyStart } from './toolbar-key-start';
import { toolbarKeyStep } from './toolbar-key-step';
import { toolbarPickTarget } from './toolbar-pick-target';
import { toolbarSideOf } from './toolbar-side-of';
import { useToolbarFocusBack } from './useToolbarFocusBack';

const useToolbarKeys = (params: ToolbarDragParams) => {
  const { rootRef, layout, definitions, onLayoutChange } = params;
  const { toolbars } = useTesseraStrings();
  const [moving, setMoving] = useState<ToolbarDragView | null>(null);
  const [message, setMessage] = useState('');
  const session = useRef<ToolbarKeySession | null>(null);
  const detach = useRef<(() => void) | null>(null);
  const restore = useRef<string | null>(null);
  const latest = useRef<ToolbarKeyLatest>({ layout, definitions, onLayoutChange, words: toolbars });
  latest.current = { layout, definitions, onLayoutChange, words: toolbars };

  const labelOf = useCallback((id: string): string => latest.current.definitions.find((definition) => definition.id === id)?.label ?? id, []);

  const show = useCallback((s: ToolbarKeySession, note: ToolbarKeyNote | null): void => {
    const { layout: current, words } = latest.current;
    const target = toolbarPickTarget(s.frame, current, s.id, s.pick);
    setMoving({ id: s.id, label: labelOf(s.id), pointer: null, target, basket: toolbarBasket(s.frame) });
    if (note) setMessage(toolbarKeyMessage(words, labelOf(s.id), note));
  }, [labelOf]);

  const finish = useCallback((end: ToolbarKeyEnd): void => {
    const s = session.current;
    detach.current?.();
    detach.current = null;
    session.current = null;
    setMoving(null);
    if (!s) return;
    restore.current = s.id;
    const done = toolbarKeyFinish(latest.current, s, end, labelOf(s.id));
    if (done.changed) latest.current.onLayoutChange(done.next);
    setMessage(done.message);
  }, [labelOf]);

  const cancel = useCallback(() => finish('cancel'), [finish]);

  const press = useCallback((key: string): boolean => {
    const s = session.current;
    if (!s) return false;
    const result = toolbarKeyStep(latest.current.layout, s.id, s.pick, key);
    if (!result) return false;
    if (result.end) finish(result.end);
    else {
      s.pick = result.pick;
      show(s, result.note);
    }
    return true;
  }, [finish, show]);

  useEffect(() => () => detach.current?.(), []);

  useToolbarFocusBack(rootRef, restore);

  const onKeyDown = useCallback((e: ReactKeyboardEvent<HTMLElement>) => {
    const root = rootRef.current;
    if (!root || session.current || e.repeat || !TOOLBAR_START_KEYS.includes(e.key)) return;
    const id = toolbarHandleOf(e.target);
    if (id === null || toolbarSideOf(latest.current.layout, id) === null) return;
    e.preventDefault();
    const started: ToolbarKeySession = { id, pick: toolbarKeyStart(latest.current.layout, id), frame: measureToolbarFrame(root) };
    session.current = started;
    detach.current = listenToolbarKeys({ root, press, cancel });
    show(started, null);
    setMessage(latest.current.words.pickedUp(labelOf(id)));
  }, [rootRef, press, cancel, show, labelOf]);

  return { moving, message, onKeyDown };
};

export { useToolbarKeys };
