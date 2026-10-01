/* @layer stories @kind component */
import { useContext } from 'react';
import type { MouseEvent } from 'react';
import { Box, Button, Callout, Icon, Text } from '../../../src/primitives';
import type { ErrorFallbackProps, ImagePlaceholderProps, LinkProps } from '../../../src/primitives';
import { ProviderReportContext } from './provider-report-context';
import './provider-app-parts.css';

const PLACEHOLDER_WORDS: Readonly<Record<ImagePlaceholderProps['status'], string>> = {
  empty: 'No art yet',
  loading: 'Fetching art',
  broken: 'Art went missing',
};

const AppLink = (props: LinkProps) => {
  const { href, onClick, children, ...rest } = props;
  const report = useContext(ProviderReportContext);
  const route = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    event.preventDefault();
    report(`Router went to ${href}`);
  };
  return <Box as="a" {...rest} href={href} data-router="app" onClick={route}>{children}</Box>;
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
      <Text>{label}</Text>
      <Text variant="caption">{error instanceof Error ? error.message : String(error)}</Text>
    </Callout>
  );
};

export { AppCrashScreen, AppImagePlaceholder, AppLink };
