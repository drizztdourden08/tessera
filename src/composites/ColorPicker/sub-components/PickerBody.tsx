/* @layer renderer-components @kind component */
import { useColorMode } from '../behavior/useColorMode';
import { ColorModePanel } from './ColorModePanel';
import { ColorModeTabs } from './ColorModeTabs';
import type { PickerBodyProps } from './PickerParts.type';
import { WheelBlock } from './WheelBlock';

const PickerBody = ({ panel, modes, mode, onModeChange }: PickerBodyProps) => {
  const { current, change } = useColorMode(modes, mode, onModeChange);
  if (!current) return <WheelBlock {...panel} />;
  return (
    <>
      <ColorModeTabs modes={modes} mode={current} onModeChange={change} />
      <ColorModePanel mode={current} {...panel} />
    </>
  );
};

export { PickerBody };
