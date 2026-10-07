/* @layer stories @kind component */
import { Paragraph } from '../../../../src/primitives';
import { Demonstrator } from '../../../_template/Demonstrator';
import { LOAD_ERROR_PLACES } from './load-error-story.constants';

const ROWS = LOAD_ERROR_PLACES.map((entry) => ({ key: entry.place, label: entry.place }));

const changeOf = (place: string) => LOAD_ERROR_PLACES.find((entry) => entry.place === place)?.change;

const LoadErrorPlaces = () => (
  <Demonstrator rows={ROWS} align="start" cell={(place) => <Paragraph tone="dim">{changeOf(place)}</Paragraph>} />
);

export { LoadErrorPlaces };
