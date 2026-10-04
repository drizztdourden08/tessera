/* @layer stories @kind component */
import { Box, Card, Status, Text } from '../../../src/primitives';
import { CONNECTION_PHASES } from './connection-samples.constants';
import type { ConnectionCardProps } from './ConnectionCard.type';

const ConnectionCard = ({ phase, detail, action, children }: ConnectionCardProps) => (
  <Card className="connection-card" data-phase={phase}>
    <Box className="connection-card__head">
      <Box className="connection-card__text">
        <Status map={CONNECTION_PHASES} value={phase} dot role="status" />
        {detail && <Text variant="caption">{detail}</Text>}
      </Box>
      {action}
    </Box>
    {children}
  </Card>
);

export { ConnectionCard };
