/* @layer stories @kind component */
import { useState } from 'react';
import { ControlMenuRow, SplitButton } from '../../../src/composites';
import { Icon, NumberInput, Slider, Toggle } from '../../../src/primitives';

const SplitButtonPanelDemo = () => {
  const [on, setOn] = useState(true);
  const [opacity, setOpacity] = useState(40);
  const [before, setBefore] = useState(2);
  const [after, setAfter] = useState(1);
  const [tint, setTint] = useState(true);

  return (
    <SplitButton
      label="Onion"
      icon={<Icon name="layers" />}
      pressed={on}
      onClick={() => setOn((was) => !was)}
      menuLabel="Onion skin options"
      panel={() => (
        <>
          <ControlMenuRow label="Opacity">
            <Slider size="sm" value={opacity} min={0} max={100} step={5} onChange={setOpacity} formatValue={(value) => `${value}%`} />
          </ControlMenuRow>
          <ControlMenuRow label="Frames before">
            <NumberInput buttons="sides" size="sm" value={before} min={0} max={8} onChange={setBefore} aria-label="Frames before" />
          </ControlMenuRow>
          <ControlMenuRow label="Frames after">
            <NumberInput buttons="sides" size="sm" value={after} min={0} max={8} onChange={setAfter} aria-label="Frames after" />
          </ControlMenuRow>
          <ControlMenuRow label="Tint">
            <Toggle size="sm" checked={tint} onChange={setTint} aria-label="Tint" />
          </ControlMenuRow>
        </>
      )}
    />
  );
};

export { SplitButtonPanelDemo };
