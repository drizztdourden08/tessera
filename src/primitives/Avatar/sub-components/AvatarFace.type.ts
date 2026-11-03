/* @layer renderer-components @kind types */
import type { AvatarFaceValue, AvatarSize } from '../Avatar.type';

interface AvatarFaceProps {
  face: AvatarFaceValue;
  label: string;
  size?: AvatarSize;
  onImageError: () => void;
}

export type { AvatarFaceProps };
