/* @layer stories @kind component */
import { Image } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { IMAGE_FITS, TOWER_URI } from './image-scenes.constants';

const ImageFits = () => (
  <Demonstrator
    columns={axis(IMAGE_FITS)}
    cell={(_row, fit) => <Image frame className="image-demo--lg image-demo__box" src={TOWER_URI} fit={fit} alt="A tower under the sun" />}
  />
);

export { ImageFits };
