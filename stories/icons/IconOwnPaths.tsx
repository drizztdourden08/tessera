/* @layer stories @kind component */
import { Icon } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { OWN_PATH_SIZES, OWN_PATHS } from './own-paths.constants';

const NAMES = Object.keys(OWN_PATHS) as (keyof typeof OWN_PATHS)[];

const IconOwnPaths = () => (
  <Demonstrator
    rows={axis(NAMES)}
    columns={axis(OWN_PATH_SIZES)}
    cell={(name, size) => <Icon path={OWN_PATHS[name]} size={Number.parseInt(size, 10)} />}
  />
);

export { IconOwnPaths };
