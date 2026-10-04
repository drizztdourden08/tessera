/* @layer stories @kind component */
import { useState } from 'react';
import { Button, ErrorBoundary, Flex, Text } from '../../../src/primitives';

const Crashing = (props: { armed: boolean }) => {
  if (props.armed) throw new Error('The sample threw on purpose.');
  return <Text>This section draws fine.</Text>;
};

const CrashDemo = () => {
  const [armed, setArmed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return (
    <Flex direction="column" gap="md" align="start">
      <Button variant="secondary" size="sm" onClick={() => setArmed(true)}>Break this section</Button>
      <ErrorBoundary
        resetKey={attempt}
        onError={() => setArmed(false)}
        action={<Button variant="tertiary" size="sm" onClick={() => setAttempt(attempt + 1)}>Show it again</Button>}
      >
        <Crashing armed={armed} />
      </ErrorBoundary>
    </Flex>
  );
};

export { CrashDemo };
