/* @layer stories @kind component */
import { useContext } from 'react';
import type { MouseEvent } from 'react';
import { Box, Flex, Toggle } from '../../../src/primitives';
import { ProviderReportContext } from './provider-report-context';

const noop = () => undefined;

const LinkDemo = () => {
  const report = useContext(ProviderReportContext);
  const stayOnPage = (event: MouseEvent<HTMLElement>) => {
    const anchor = event.target instanceof Element ? event.target.closest('a') : null;
    if (!anchor || anchor.dataset.router === 'app') return;
    event.preventDefault();
    report(`A plain link would load ${anchor.getAttribute('href') ?? ''}`);
  };
  return (
    <Flex gap="lg" align="center" wrap onClickCapture={stayOnPage}>
      <Box href="/guides/provider">Read the setup guide</Box>
      <Toggle checked label="Sync saves" description="Keeps saves in step across machines." link="/settings/sync" onChange={noop} />
    </Flex>
  );
};

export { LinkDemo };
