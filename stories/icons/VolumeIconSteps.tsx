/* @layer stories @kind component */
import { VolumeIcon } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { VOLUME_CASES } from './volume-icon.constants';

const VolumeIconSteps = () => (
  <Demonstrator
    columns={axis(Object.keys(VOLUME_CASES))}
    cell={(_row, column) => {
      const { level, muted } = VOLUME_CASES[column] ?? { level: 0, muted: false };
      return <VolumeIcon level={level} muted={muted} size={32} />;
    }}
  />
);

export { VolumeIconSteps };
