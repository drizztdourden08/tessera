/* @layer renderer-components @kind types */
import type { Dispatch, SetStateAction } from 'react';
import type { SelectOption } from '../Select.type';

interface UseSelectKeyDownParams {
  open: boolean;
  highlightIdx: number;
  filtered: SelectOption[];
  setHighlightIdx: Dispatch<SetStateAction<number>>;
  handleOpen: () => void;
  handleSelect: (value: string) => void;
}

export type { UseSelectKeyDownParams };
