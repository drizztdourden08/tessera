/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { TagChoiceParams } from '../PixelPlayer.type';

const useTagChoice = (params: TagChoiceParams): readonly [string | null, (id: string | null) => void] => {
  const { tagId, onTagChange } = params;
  const [own, setOwn] = useState<string | null>(null);
  const choose = useCallback((id: string | null) => {
    if (tagId === undefined) setOwn(id);
    onTagChange?.(id);
  }, [tagId, onTagChange]);
  return [tagId === undefined ? own : tagId, choose];
};

export { useTagChoice };
