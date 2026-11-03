/* @layer renderer-components @kind types */
import type { AvatarFaceValue } from '../Avatar.type';

interface AvatarFaceState {
  face: AvatarFaceValue;
  onImageError: () => void;
}

export type { AvatarFaceState };
