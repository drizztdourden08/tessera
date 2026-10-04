/* @layer stories @kind hook */
import { useEffect, useRef, useState } from 'react';
import type { SaveStateKind } from '../EditorBar.type';
import { SAVE_DELAY } from './editor-samples.constants';

const useEditorDemo = (initial: string, start: SaveStateKind = 'clean') => {
  const [saved, setSaved] = useState(initial);
  const [name, setName] = useState(initial);
  const [state, setState] = useState<SaveStateKind>(start);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const edit = (next: string): void => {
    setName(next);
    setState(next === saved ? 'clean' : 'dirty');
  };
  const save = (): void => {
    setState('saving');
    timer.current = window.setTimeout(() => {
      const blank = name.trim() === '';
      setState(blank ? 'error' : 'saved');
      if (!blank) setSaved(name);
    }, SAVE_DELAY);
  };
  const reset = (): void => edit(saved);
  const nameError = name.trim() === '' ? 'Give it a name.' : undefined;
  return { name, edit, state, save, reset, nameError, error: blankReason(state, name) };
};

const blankReason = (state: SaveStateKind, name: string): string | undefined =>
  (state === 'error' && name.trim() === '' ? 'A preset needs a name.' : undefined);

export { useEditorDemo };
