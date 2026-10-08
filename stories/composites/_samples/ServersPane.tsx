/* @layer stories @kind component */
import { ItemList } from '../../../src/composites';
import { Card } from '../../../src/primitives';
import { SERVERS } from './load-error-samples.constants';
import type { LoadErrorSampleProps } from './load-error-story.type';
import { useRetryDemo } from './useRetryDemo';

const ignore = () => undefined;
const nameOf = (id: string) => id;
const NO_SERVERS: readonly string[] = [];

const ServersPane = ({ retrying }: LoadErrorSampleProps) => {
  const retry = useRetryDemo(retrying);
  return (
    <Card className="load-error-story__pane">
      <ItemList
        title={SERVERS.title}
        items={NO_SERVERS}
        getId={nameOf}
        getName={nameOf}
        onCreate={ignore}
        createLabel="Add"
        loading={retry.retrying}
        error={SERVERS.raw}
        onRetry={retry.onRetry}
        className="load-error-story__list"
      />
    </Card>
  );
};

export { ServersPane };
