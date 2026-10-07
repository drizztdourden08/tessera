/* @layer renderer-components @kind hook */
import { useId, useState } from 'react';
import { useFieldControl } from '../../../primitives/Field/behavior/useFieldControl';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { PathInputProps, PathInputView } from '../PathInput.type';
import { browseWith } from './browse-with';
import { pathInputFlags } from './path-input-flags';
import { pathInputWords } from './path-input-words';
import { usePathDrop } from './usePathDrop';

const usePathInput = (props: PathInputProps): PathInputView => {
  const { onChange, onBrowse, kind = 'file', accept, resolvePath } = props;
  const control = useFieldControl(props.id, props['aria-describedby']);
  const problemId = useId();
  const [focused, setFocused] = useState(false);
  const set = (path: string | null) => onChange?.(path);
  const open = pathInputFlags(props, { invalid: false, problem: false, focused: true, dropping: false });
  const drop = usePathDrop({ kind, accept, resolvePath }, open.editable && !open.disabled, set);
  const flags = pathInputFlags(props, { invalid: control.invalid === true, problem: drop.problem !== null, focused, dropping: drop.dropping });
  return {
    ...flags, kind, drop, problemId, setFocused,
    words: pathInputWords(useTesseraStrings(), props, drop.problem),
    inputId: control.id,
    labelId: control.labelId,
    describedBy: [control.describedBy, drop.problem ? problemId : undefined].filter(Boolean).join(' ') || undefined,
    blur: (event) => { setFocused(false); props.onBlur?.(event); },
    change: (text) => { drop.clearProblem(); set(text || null); },
    clear: () => { drop.clearProblem(); set(null); },
    browse: flags.editable && onBrowse ? browseWith(onBrowse, set) : undefined,
  };
};

export { usePathInput };
