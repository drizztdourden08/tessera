/* @layer stories @kind component */
import { useState } from 'react';
import { SplitButton } from '../../../src/composites';
import type { MenuNode } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import type { ButtonSize, ButtonVariant } from '../../../src/primitives';

type SplitButtonDemoProps = {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  pressed?: boolean;
  toggle?: boolean;
  disabled?: boolean;
};

const ITEMS: readonly MenuNode[] = [
  { id: 'folder', label: 'New folder', icon: 'folder' },
  { id: 'template', label: 'New from template', icon: 'file-text' },
  { separator: true },
  { id: 'import', label: 'Import...', icon: 'upload' },
];

const SplitButtonDemo = (props: SplitButtonDemoProps) => {
  const { label = 'New file', toggle = false, pressed, ...rest } = props;
  const [on, setOn] = useState(pressed ?? false);
  const state = toggle || pressed !== undefined ? { pressed: pressed ?? on } : {};
  return (
    <SplitButton
      {...rest}
      {...state}
      label={label}
      icon={<Icon name="plus" />}
      items={ITEMS}
      menuLabel={`${label} options`}
      onClick={() => setOn((was) => !was)}
    />
  );
};

export { SplitButtonDemo };
