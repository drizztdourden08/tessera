/* @layer stories @kind hook */
import { useState } from 'react';
import { SPRITES } from './studio-sample.constants';

const usePickedSprite = () => {
  const [picked, setPicked] = useState<string>(SPRITES[0].id);
  const sprite = SPRITES.find((item) => item.id === picked) ?? SPRITES[0];
  return { sprite, setPicked };
};

export { usePickedSprite };
