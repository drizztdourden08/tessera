/* @layer stories @kind component */
import { useState } from 'react';
import { Select } from '../../../src/primitives';
import type { ControlSize, MultiDisplay, ValueDisplay } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { BuildDetails } from './BuildDetails';
import { BUILDS } from './picker-data';
import { BUILD_CATEGORIES, BUILD_COLUMNS, STATUS_COLUMNS } from './picker-emoji';
import type { Build } from './picker-data';

type PickerLook = 'columns' | 'status emoji' | 'custom item';

type SelectArgs = {
  placeholder: string;
  look: PickerLook;
  grouped: boolean;
  valueDisplay: ValueDisplay;
  multiDisplay: MultiDisplay;
  min: number;
  max: number;
  searchable: boolean;
  loading: boolean;
  size: ControlSize;
  disabled: boolean;
  invalid: boolean;
};

const lookProps = (look: PickerLook | undefined) => {
  if (look === 'custom item') return { itemComponent: BuildDetails };
  return { columns: look === 'columns' ? BUILD_COLUMNS : STATUS_COLUMNS };
};

const SelectPlayground = (props: Partial<SelectArgs>) => {
  const { look, grouped, min, max = 1, ...rest } = props;
  const [build, setBuild] = useState<Build | null>(BUILDS[0] ?? null);
  const [builds, setBuilds] = useState<Build[]>(BUILDS.slice(0, 2));
  const multi = max > 1;
  const names = multi ? builds.map((entry) => entry.name) : build?.name ?? 'none';

  return (
    <ValueReadout value={names}>
      <Select
        {...rest}
        {...lookProps(look)}
        items={BUILDS}
        groupBy={grouped ? 'status' : undefined}
        categories={BUILD_CATEGORIES}
        min={min}
        max={max}
        value={build}
        onChange={setBuild}
        values={builds}
        onValuesChange={setBuilds}
      />
    </ValueReadout>
  );
};

export { SelectPlayground };
export type { SelectArgs };
