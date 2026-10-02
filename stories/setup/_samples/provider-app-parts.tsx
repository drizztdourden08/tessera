/* @layer stories @kind component */
import { Box, Button, Callout, Icon, Text } from '../../../src/primitives';
import type { ErrorFallbackProps, ImagePlaceholderProps } from '../../../src/primitives';
import './provider-app-parts.css';

const PLACEHOLDER_WORDS: Readonly<Record<ImagePlaceholderProps['status'], string>> = {
  empty: 'No art yet',
  loading: 'Fetching art',
  broken: 'Art went missing',
};

const AppImagePlaceholder = (props: ImagePlaceholderProps) => {
  const { status } = props;
  return (
    <Box className="app-placeholder" data-status={status}>
      <Icon name={status === 'broken' ? 'circle-x' : 'image'} size={20} />
      <Text variant="caption">{PLACEHOLDER_WORDS[status]}</Text>
    </Box>
  );
};

const AppCrashScreen = (props: ErrorFallbackProps) => {
  const { error, label, reset } = props;
  return (
    <Callout tone="danger" action={<Button variant="secondary" size="sm" onClick={reset}>Try again</Button>}>
      <Box className="story-column">
        <Text>{label}</Text>
        <Text variant="caption">{error instanceof Error ? error.message : String(error)}</Text>
      </Box>
    </Callout>
  );
};

export { AppCrashScreen, AppImagePlaceholder };
