/* @layer stories @kind component */
import { useState } from 'react';
import { ControlMenuRow, SplitButton } from '../../../src/composites';
import { Icon, Slider } from '../../../src/primitives';
import type { ButtonSize } from '../../../src/primitives';

type SplitButtonIconDemoProps = {
  size?: ButtonSize;
  pressed?: boolean;
};

const SplitButtonIconDemo = ({ size = 'sm', pressed = false }: SplitButtonIconDemoProps) => {
  const [on, setOn] = useState(pressed);
  const [opacity, setOpacity] = useState(40);

  return (
    <SplitButton
      label="Onion skin"
      icon={<Icon name="layers" />}
      iconOnly
      shortcut="F3"
      variant="ghost"
      size={size}
      pressed={on}
      onClick={() => setOn((was) => !was)}
      menuLabel="Onion skin options"
      panel={() => (
        <ControlMenuRow label="Opacity">
          <Slider size="sm" value={opacity} min={0} max={100} step={5} onChange={setOpacity} formatValue={(value) => `${value}%`} />
        </ControlMenuRow>
      )}
    />
  );
};

export { SplitButtonIconDemo };
