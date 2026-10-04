/* @layer renderer-components @kind hook */
import { useId, useState } from 'react';
import { useFieldControl } from '../../Field/behavior/useFieldControl';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { PathFieldProps, PathFieldView } from '../PathField.type';
import { browseWith } from './browse-with';
import { pathFieldFlags } from './path-field-flags';
import { pathFieldWords } from './path-field-words';
import { usePathDrop } from './usePathDrop';

const usePathField = (props: PathFieldProps): PathFieldView => {
  const { onChange, onBrowse, kind = 'file', accept, resolvePath } = props;
  const control = useFieldControl(props.id, props['aria-describedby']);
  const problemId = useId();
  const [focused, setFocused] = useState(false);
  const set = (path: string | null) => onChange?.(path);
  const open = pathFieldFlags(props, { invalid: false, problem: false, focused: true, dropping: false });
  const drop = usePathDrop({ kind, accept, resolvePath }, open.editable && !open.disabled, set);
  const flags = pathFieldFlags(props, { invalid: control.invalid === true, problem: drop.problem !== null, focused, dropping: drop.dropping });
  return {
    ...flags, kind, drop, problemId, setFocused,
    words: pathFieldWords(useTesseraStrings(), props, drop.problem),
    inputId: control.id,
    labelId: control.labelId,
    describedBy: [control.describedBy, drop.problem ? problemId : undefined].filter(Boolean).join(' ') || undefined,
    change: (text) => { drop.clearProblem(); set(text || null); },
    clear: () => { drop.clearProblem(); set(null); },
    browse: flags.editable && onBrowse ? browseWith(onBrowse, set) : undefined,
  };
};

export { usePathField };
