/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { OLDER_CHUNK } from '../LogPanel.constants';
import type { LogOlderProps } from './LogOlder.type';

const LogOlder = (props: LogOlderProps) => {
  const { hidden, newestFirst, onLoad } = props;
  const { panels } = useTesseraStrings();

  return (
    <Box className="log-panel__older">
      <Button variant="ghost" size="sm" icon={<Icon name={newestFirst ? 'arrow-down' : 'arrow-up'} />} onClick={onLoad}>
        {panels.loadOlder(Math.min(OLDER_CHUNK, hidden))}
      </Button>
      <Text className="log-panel__older-note">{panels.olderHidden(hidden)}</Text>
    </Box>
  );
};

export { LogOlder };
