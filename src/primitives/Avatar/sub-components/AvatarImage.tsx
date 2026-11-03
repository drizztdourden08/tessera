/* @layer renderer-components @kind component */
import { ImageElement } from '../../media/ImageElement';
import type { AvatarImageProps } from './AvatarImage.type';

const AvatarImage = (props: AvatarImageProps) => {
  const { src, onError } = props;
  return <ImageElement className="avatar__img" src={src} alt="" draggable={false} onError={onError} />;
};

export { AvatarImage };
