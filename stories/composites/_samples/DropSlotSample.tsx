/* @layer stories @kind component */
import { useState } from 'react';
import { DropSlot } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import type { DropSlotSize } from '../../../src/composites';

interface DropSlotSampleProps {
  size?: DropSlotSize;
  disabled?: boolean;
  startFilled?: boolean;
}

const ACCOUNT_TYPE = 'application/x-account';

const DropSlotSample = (props: DropSlotSampleProps) => {
  const { size, disabled, startFilled = false } = props;
  const [account, setAccount] = useState<string | undefined>(startFilled ? 'Main account' : undefined);
  const [picks, setPicks] = useState(0);
  return (
    <Box className="drop-slot-story">
      <Button
        draggable
        onDragStart={(event) => event.dataTransfer.setData(ACCOUNT_TYPE, 'Savings account')}
      >
        Drag me
      </Button>
      <DropSlot
        label="From"
        size={size}
        disabled={disabled}
        accept={ACCOUNT_TYPE}
        onDrop={setAccount}
        onClear={() => setAccount(undefined)}
        onPick={() => setPicks((count) => count + 1)}
      >
        {account && <Text>{account}</Text>}
      </DropSlot>
      <Text variant="caption" tone="faint">{`Picks: ${picks}`}</Text>
    </Box>
  );
};

export { DropSlotSample };
