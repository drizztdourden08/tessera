/* @layer stories @kind component */
import { ArmedIcon } from '../../src/primitives';
import type { ArmedIconName } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { ARMED_ICON_CASES } from './armed-icon.constants';

const NAMES: readonly ArmedIconName[] = ['load-state', 'save-state', 'trash-2'];

const ArmedIconRow = () => (
  <Demonstrator
    corner="name"
    rows={axis(NAMES)}
    columns={axis(Object.keys(ARMED_ICON_CASES))}
    cell={(name, column) => {
      const { armed, size } = ARMED_ICON_CASES[column] ?? { armed: false, size: 16 };
      return <ArmedIcon name={name} armed={armed} size={size} />;
    }}
  />
);

export { ArmedIconRow };
