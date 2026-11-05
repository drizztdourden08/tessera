/* @layer renderer-components @kind hook */
import { useCallback, useRef, useState } from 'react';
import type { IconName } from '../../../primitives/Icon';
import { readIconFile } from './read-icon-file';
import type { IconFileProblem } from './read-icon-file.type';
import type { UseIconPickerParams } from './useIconPicker.type';

const useIconPicker = ({ onChange }: UseIconPickerParams) => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [problem, setProblem] = useState<IconFileProblem | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setProblem(null);
    anchorRef.current?.focus();
  }, []);

  const toggle = () => (open ? close() : setOpen(true));

  const pickIcon = (name: IconName) => {
    onChange({ kind: 'icon', name });
    close();
  };

  const upload = async (files: File[]) => {
    const result = await readIconFile(files[0]);
    if ('problem' in result) { setProblem(result.problem); return; }
    onChange(result.value);
    close();
  };

  return { anchorRef, open, query, problem, setQuery, close, toggle, pickIcon, upload };
};

export { useIconPicker };
