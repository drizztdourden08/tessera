/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { ZOOM_SUFFIX } from '../ZoomField.constants';
import type { ZoomPresetsProps } from '../ZoomField.type';

const ZoomPresets = ({ presets, value, label, disabled, onPick }: ZoomPresetsProps) => (
  <Flex gap="2xs" align="center" role="group" aria-label={label}>
    {presets.map((preset) => (
      <Button key={preset} size="xs" variant="ghost" active={preset === value} disabled={disabled} onClick={() => onPick(preset)}>
        {`${String(preset)}${ZOOM_SUFFIX}`}
      </Button>
    ))}
  </Flex>
);

export { ZoomPresets };
