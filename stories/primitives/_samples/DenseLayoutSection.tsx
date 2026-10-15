/* @layer stories @kind component */
import { useState } from 'react';
import { Field, FieldControlBoundary, Flex, NumberInput, SegmentedControl, Select, Slider } from '../../../src/primitives';
import { ANCHORS, FLOWS } from './dense-editor.constants';

const DenseLayoutSection = () => {
  const [anchor, setAnchor] = useState('top-left');
  const [x, setX] = useState(12);
  const [y, setY] = useState(8);
  const [width, setWidth] = useState(160);
  const [flow, setFlow] = useState('row');
  return (
    <>
      <Field label="Anchor">
        <Select options={ANCHORS} value={anchor} onChange={setAnchor} />
      </Field>
      <Field label="Offset">
        <FieldControlBoundary>
          <Flex gap="xs">
            <NumberInput aria-label="Offset x" value={x} onChange={setX} />
            <NumberInput aria-label="Offset y" value={y} onChange={setY} />
          </Flex>
        </FieldControlBoundary>
      </Field>
      <Field label="Width">
        <Slider value={width} min={0} max={400} step={8} onChange={setWidth} formatValue={(value) => `${value} px`} />
      </Field>
      <SegmentedControl label="Flow" value={flow} options={FLOWS} onChange={setFlow} />
    </>
  );
};

export { DenseLayoutSection };
