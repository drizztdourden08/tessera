/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { AvatarFaceValue, AvatarProps } from '../Avatar.type';
import { initialsOf } from './initials-of';

interface AvatarFaceState {
  face: AvatarFaceValue;
  onImageError: () => void;
}

const useAvatarFace = (props: AvatarProps): AvatarFaceState => {
  const { label, src, initials, icon } = props;
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);
  const onImageError = () => setFailedSrc(src);
  if (src === undefined) return { face: { initials, icon }, onImageError };
  if (failedSrc === src) return { face: { initials: initialsOf(label) }, onImageError };
  return { face: { src }, onImageError };
};

export { useAvatarFace };
