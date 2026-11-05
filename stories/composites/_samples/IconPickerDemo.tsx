/* @layer stories @kind story */
import { useState } from 'react';
import { IconPicker } from '../../../src/composites/IconPicker';
import type { IconPickerProps, IconPickerValue } from '../../../src/composites/IconPicker';

type IconPickerDemoProps = Pick<IconPickerProps, 'allowUpload' | 'disabled'>;

const IconPickerDemo = (props: IconPickerDemoProps) => {
  const [value, setValue] = useState<IconPickerValue>({ kind: 'icon', name: 'folder' });
  return <IconPicker label="Project icon" value={value} onChange={setValue} {...props} />;
};

export { IconPickerDemo };
export type { IconPickerDemoProps };
