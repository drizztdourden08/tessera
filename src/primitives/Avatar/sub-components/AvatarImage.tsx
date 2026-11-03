/* @layer renderer-components @kind component */
import { ImageElement } from '../../media/ImageElement';

interface AvatarImageProps {
  src: string;
  label: string;
  onError: () => void;
}

const AvatarImage = (props: AvatarImageProps) => {
  const { src, label, onError } = props;
  return <ImageElement className="avatar__img" src={src} alt={label} draggable={false} onError={onError} />;
};

export { AvatarImage };
