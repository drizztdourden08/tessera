/* @layer stories @kind component */
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ErrorBoundary } from '../../../src/composites';
import { Box, Button, Callout, Icon, StatRow, TesseraProvider, Text } from '../../../src/primitives';
import type { ErrorFallbackProps, TesseraOverrides } from '../../../src/primitives';

type SectionProps = { errorMessage: string };

type BreakDemoProps = SectionProps & { label?: string; action?: ReactNode; retry?: boolean };

const ORDER_FACTS: readonly (readonly [string, string])[] = [['Order', '#10482'], ['Items', '3'], ['Total', '$84.20']];

const OrderSummary = ({ errorMessage }: SectionProps) => {
  const [broken, setBroken] = useState(false);
  if (broken) throw new Error(errorMessage);
  return (
    <Box className="story-column">
      {ORDER_FACTS.map(([label, value]) => <StatRow key={label} label={label} value={value} />)}
      <Button size="sm" variant="secondary" onClick={() => setBroken(true)}>Break this section</Button>
    </Box>
  );
};

const SameMarkupDemo = () => {
  const bare = useRef<HTMLElement>(null);
  const fenced = useRef<HTMLElement>(null);
  const [same, setSame] = useState<boolean>();
  useEffect(() => setSame(bare.current?.innerHTML === fenced.current?.innerHTML), []);
  const verdict = same ? 'yes' : 'no';
  return (
    <Box className="story-column">
      <Box className="error-boundary-story__pair">
        <Box className="error-boundary-story__frame">
          <Text className="story-label">Without ErrorBoundary</Text>
          <Box ref={bare}><StatRow label="Order" value="#10482" /></Box>
        </Box>
        <Box className="error-boundary-story__frame">
          <Text className="story-label">Inside ErrorBoundary</Text>
          <Box ref={fenced}><ErrorBoundary><StatRow label="Order" value="#10482" /></ErrorBoundary></Box>
        </Box>
      </Box>
      <Text>{same === undefined ? 'Comparing the markup.' : `Same markup in both frames: ${verdict}.`}</Text>
    </Box>
  );
};

const ignore = () => undefined;

const BreakDemo = ({ errorMessage, label, action, retry = false }: BreakDemoProps) => {
  const [round, setRound] = useState(0);
  return (
    <Box className="story-column">
      <Box className="error-boundary-story__frame">
        <ErrorBoundary key={round} label={label} action={action} onRetry={retry ? ignore : undefined}>
          <OrderSummary errorMessage={errorMessage} />
        </ErrorBoundary>
      </Box>
      <Button size="sm" variant="tertiary" onClick={() => setRound(round + 1)}>Start the demo over</Button>
    </Box>
  );
};

const RetryNotice = ({ label, reset, className }: ErrorFallbackProps) => (
  <Callout
    tone="warning"
    icon={<Icon name="triangle-alert" size={16} />}
    action={<Button size="sm" variant="secondary" onClick={reset}>Try again</Button>}
    className={className}
  >
    {label}
  </Callout>
);

const CUSTOM_FALLBACK: TesseraOverrides = { errorFallback: RetryNotice };

const ProviderFallbackDemo = ({ errorMessage }: SectionProps) => (
  <TesseraProvider overrides={CUSTOM_FALLBACK}>
    <BreakDemo errorMessage={errorMessage} />
  </TesseraProvider>
);

const ResetKeyDemo = ({ errorMessage }: SectionProps) => {
  const [attempt, setAttempt] = useState(0);
  const reload = <Button size="sm" variant="secondary" onClick={() => setAttempt(attempt + 1)}>Reload the section</Button>;
  return (
    <Box className="story-column">
      <Box className="error-boundary-story__frame">
        <ErrorBoundary label="The order summary could not be shown" action={reload} resetKey={attempt}>
          <OrderSummary errorMessage={errorMessage} />
        </ErrorBoundary>
      </Box>
      <Text className="story-label">{`resetKey is ${attempt}`}</Text>
    </Box>
  );
};

export { BreakDemo, ProviderFallbackDemo, ResetKeyDemo, SameMarkupDemo };
