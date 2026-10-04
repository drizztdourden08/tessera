/* @layer stories @kind component */
import { Stack } from '../../../src/primitives';
import { MascotTabs } from './MascotTabs';
import type { MascotTabbedProps } from './MascotTabbed.type';
import { useMascotTab } from './useMascotTab';

const MascotTabbed = (props: MascotTabbedProps) => {
  const { draw, tabs = false } = props;
  const [brand] = useMascotTab();
  if (!tabs) return draw(brand);
  return (
    <Stack gap="lg">
      <MascotTabs />
      {draw(brand)}
    </Stack>
  );
};

export { MascotTabbed };
