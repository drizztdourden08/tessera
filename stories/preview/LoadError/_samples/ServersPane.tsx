/* @layer stories @kind component */
import { useRef } from 'react';
import { ItemList } from '../../../../src/composites';
import { ItemListHead } from '../../../../src/composites/ItemList/sub-components/ItemListHead';
import { Box, Card } from '../../../../src/primitives';
import { LoadError } from '../LoadError';
import { SERVERS } from './load-error-samples.constants';
import type { PlaceSampleProps } from './place-sample.type';
import { useRetryDemo } from './useRetryDemo';

const ignore = () => undefined;
const nameOf = (id: string) => id;

const ServersPane = ({ today = false, retrying }: PlaceSampleProps) => {
  const newRef = useRef<HTMLButtonElement>(null);
  const retry = useRetryDemo(retrying);
  if (today) {
    return (
      <Card className="load-error-story__pane">
        <ItemList title={SERVERS.title} items={[]} getId={nameOf} getName={nameOf} onCreate={ignore} createLabel="Add" error={SERVERS.raw} />
      </Card>
    );
  }
  return (
    <Card className="load-error-story__pane">
      <Box as="section" className="item-list load-error-story__list" aria-label={SERVERS.title}>
        <ItemListHead title={SERVERS.title} shown={0} total={0} onNew={ignore} newRef={newRef} creating={false} createLabel="Add" createTour="item-list-new" />
        <LoadError message={SERVERS.sentence} error={SERVERS.raw} {...retry} />
      </Box>
    </Card>
  );
};

export { ServersPane };
