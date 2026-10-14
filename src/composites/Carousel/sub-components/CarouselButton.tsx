/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Tooltip } from '../../../primitives/Tooltip';
import type { CarouselButtonProps } from '../Carousel.type';

const CarouselButton = (props: CarouselButtonProps) => {
  const { icon, label, onPress, disabled, variant = 'ghost', size = 'sm', className } = props;
  return (
    <Tooltip content={label} className={className}>
      <IconButton variant={variant} size={size} label={label} disabled={disabled} onClick={onPress}>
        <Icon name={icon} />
      </IconButton>
    </Tooltip>
  );
};

export { CarouselButton };
