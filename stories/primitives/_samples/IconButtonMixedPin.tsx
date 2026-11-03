/* @layer stories @kind component */
import { useState } from 'react';
import { Icon, IconButton } from '../../../src/primitives';
import type { IconButtonMixedPinProps } from './IconButtonMixedPin.type';

const IconButtonMixedPin = (props: IconButtonMixedPinProps) => {
  const { variant, mixed } = props;
  const [on, setOn] = useState(false);
  const [differs, setDiffers] = useState(mixed);
  return (
    <IconButton
      label={`Pin tracker, ${variant}`}
      variant={variant}
      size="md"
      active={on}
      mixed={differs}
      onClick={() => {
        setDiffers(false);
        setOn(differs || !on);
      }}
    >
      <Icon name="pin" size={16} />
    </IconButton>
  );
};

export { IconButtonMixedPin };
